import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subject } from 'rxjs';
import { SpeechRecognitionService } from './speech';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
  ],
})
export class SearchEngineComponent implements OnInit {
  lang: any = 'en';
  searchKeywords: string = '';
  hideSearch: boolean = true;
  recentSearch: any = [];
  isListening: boolean = false;
  recognition: any;
  hideMobileIcon: boolean = false;
  @ViewChild('inputText') inputText!: ElementRef<HTMLInputElement>;
  // canvas wave form
  @ViewChild('waveformCanvas') waveformCanvas!: ElementRef<HTMLCanvasElement>;
  audioContext!: AudioContext;
  analyser!: AnalyserNode;
  dataArray!: Uint8Array;
  source!: MediaStreamAudioSourceNode;
  animationId: number = 0;
  isRedirected: boolean = false;
  userLoggedIn: boolean = false;
  searchSubject = new Subject<string>();
  mediaStream: MediaStream | null = null;
  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private speechService: SpeechRecognitionService,
  ) {

  }
  ngOnInit(): void {
    // this.initSpeechRecognition();
    this.speechService.init(this.lang === 'en' ? 'en-US' : 'ar-SA');
    document.body.addEventListener('click', (e: any) => {
      if (
        !e.target.closest('.vf-search-engine') &&
        !e.target.classList.contains('clear') &&
        !e.target.closest('.mobile-container')
      ) {
        this.hideSearch = true;
      }
    });
    document.body.addEventListener('click', (e: any) => {
      if (
        !e.target.closest('.mobile-container') &&
        !e.target.classList.contains('clear') &&
        !e.target.closest('.search-results')
      ) {
        this.hideMobileIcon = false;
      }
    });
  }

  initSpeechRecognition(): void {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.lang === 'en' ? 'en-US' : 'ar-SA';

      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        const results = event.results[0];
        if (results.isFinal) {
          const transcript = results[0].transcript.trim();
          console.log('recording', transcript);
          if (transcript) {
            this.searchKeywords = transcript;
          } else {
            this.retrySpeechRecognition();
          }
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.stopVisualizer();
        this.cdr.detectChanges();
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        this.cdr.detectChanges();
      };
    } else {
      console.error('Speech Recognition API is not supported in this browser.');
    }
  }

  retrySpeechRecognition(): void {
    console.log('Retrying speech recognition...');
    setTimeout(() => {
      if (!this.isListening) {
        this.ngZone.runOutsideAngular(() => {
          this.recognition.start();
        });
        this.isListening = true;
        this.startVisualizer();
      }
    }, 500);
  }
  // toggleSpeechRecognition(event: any): void {
  //   if (this.isListening) {
  //     this.recognition.stop();
  //     this.stopVisualizer();
  //     this.isListening = false;
  //     this.cdr.detectChanges();
  //   } else {
  //     this.ngZone.runOutsideAngular(() => {
  //       this.recognition.start();
  //     });
  //     this.isListening = true;
  //     this.startVisualizer();
  //   }
  // }
  toggleSpeechRecognition(event: any): void {
    if (this.isListening) {
      this.speechService.stop();
      this.stopVisualizer();
      this.isListening = false;
      this.cdr.detectChanges();
    } else {
      this.isListening = true;
      this.startVisualizer();
      this.cdr.detectChanges();
      this.speechService.start().subscribe({
        next: (transcript) => {
          console.log(transcript)
          this.searchKeywords = transcript;
        },
        error: (err) => {
          console.error('Speech recognition error:', err);
          this.isListening = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.isListening = false;
          this.stopVisualizer();
          this.cdr.detectChanges();
        }
      });
    }
  }
  startVisualizer(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaStream = stream;
      //   this.audioContext = new (window.AudioContext ||
      //     (window as any).webkitAudioContext)();
      //   this.analyser = this.audioContext.createAnalyser();
      //   this.analyser.fftSize = 64; // ~32 bars

      //   const bufferLength = this.analyser.frequencyBinCount; // 32
      //   this.dataArray = new Uint8Array(bufferLength);

      //   this.source = this.audioContext.createMediaStreamSource(stream);
      //   this.source.connect(this.analyser);

      //   const canvas = this.waveformCanvas.nativeElement;
      //   const ctx = canvas.getContext('2d')!;
      //   canvas.width = 120;
      //   // Set canvas height to 50 to match the bar height
      //   canvas.height = 50;

      //   const barWidth = 3;
      //   const barGap = 1;
      //   // max total bar height (up+down)
      //   const maxBarHeight = canvas.height * 0.8;

      //   let waveOffset = 0;

      //   const draw = () => {
      //     this.animationId = requestAnimationFrame(draw);

      //     this.analyser.getByteFrequencyData(this.dataArray);

      //     ctx.clearRect(0, 0, canvas.width, canvas.height);

      //     ctx.fillStyle = '#e60000';
      //     // wave speed
      //     waveOffset += 0.15;

      //     const centerY = canvas.height / 2;

      //     for (let i = 0; i < bufferLength; i++) {
      //       // normalize 0-1
      //       const amplitude = this.dataArray[i] / 255;
      //       // ~0.2 - 1.0
      //       const wave = Math.sin(i * 0.6 + waveOffset) * 0.4 + 0.6;

      //       const barHeight = amplitude * maxBarHeight * wave;

      //       const x = i * (barWidth + barGap);
      //       const y = centerY - barHeight / 2;

      //       // Draw the bar centered vertically (bars grow both up and down)
      //       ctx.fillRect(x, y, barWidth, barHeight);
      //     }
      //   };

      //   draw();
      })
      // .catch((err) => {
      //   console.error('Microphone access denied', err);
      // });
  }

  stopVisualizer(): void {
    // if (this.animationId) cancelAnimationFrame(this.animationId);
    // if (this.audioContext) this.audioContext.close();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }

}



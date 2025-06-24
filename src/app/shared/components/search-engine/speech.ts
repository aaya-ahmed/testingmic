import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private isInitialized = false;

  constructor(private ngZone: NgZone) {}

  init(lang: string = 'en-US') {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = lang;
    this.recognition.maxAlternatives = 1;
    this.isInitialized = true;
  }

  start(): Observable<string> {
    return new Observable<string>((observer) => {
      if (!this.isInitialized || !this.recognition) {
        observer.error('Speech recognition is not initialized.');
        return;
      }

      this.recognition.onresult = (event: any) => {
        console.log("hello")
        const results = event.results[0];
        if (results.isFinal) {
          const transcript = results[0].transcript.trim();
            observer.next(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
          observer.error(event.error);
      };

      this.recognition.onend = () => {
          observer.complete();
      };

      // Start recognition outside Angular to avoid triggering change detection on every audio tick
      // this.ngZone.runOutsideAngular(() => {
        try {
          this.recognition.start();
        } catch (err) {
          observer.error(err);
        }
      // });
    });
  }

  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}



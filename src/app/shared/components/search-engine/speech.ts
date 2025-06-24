import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private isInitialized = false;

  constructor() {}

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
        const results = event.results[0];
        if (results.isFinal) {
          const transcript = results[0].transcript.trim();
          console.log("transcript", transcript);
            observer.next(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
          observer.error(event.error);
      };

      this.recognition.onend = () => {
          observer.complete();
      };

        try {
        console.log("hello1")
          this.recognition.start();
        } catch (err) {
          observer.error(err);
        }
    });
  }

  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}



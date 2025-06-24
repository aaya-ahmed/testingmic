import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private isInitialized = false;
  sugessions = '';
  constructor() { }

  init(lang: string = 'en-US') {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = lang;
    this.recognition.maxAlternatives = 1;

    this.isInitialized = true;
  }

  start(): Observable<string | { isFinal: boolean, transcript: string }> {
    return new Observable<string | { isFinal: boolean, transcript: string }>((observer) => {
      if (!this.isInitialized || !this.recognition) {
        observer.error('Speech recognition is not initialized.');
        return;
      }

      this.recognition.onresult = (event: any) => {
        const results = event.results[0];
        const transcript = results[0].transcript.trim();
        observer.next({ transcript: transcript, isFinal: true });
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



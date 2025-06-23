import {enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

export function initializeProdMode() {

if (environment.production) {

enableProdMode();

}

}
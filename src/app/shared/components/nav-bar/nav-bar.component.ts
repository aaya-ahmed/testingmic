import { Component,  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchEngineComponent } from '../search-engine/search-engine.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    SearchEngineComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent{

}


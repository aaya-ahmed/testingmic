import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { NavBarComponent } from "./app/shared/components/nav-bar/nav-bar.component";
import {BrowserAnimationsModule}from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app/app-routing.module";


@NgModule({

    schemas: [NO_ERRORS_SCHEMA],

    declarations: [AppComponent],

    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NavBarComponent,],
    
    bootstrap: [AppComponent],
})

export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreationDonComponent } from './creation-don/creation-don.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    Accueil1Component,
    AppComponent,
    CreationDonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { WeatherComponet } from './weather.componet';
import { SiteHeaderComponent } from './site-header/site-header.component';

import { ApiService } from './api.service';
import { RoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    WeatherComponet
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

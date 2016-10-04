import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule }  from '@angular/platform-browser';
import { OrderTracksByPipe, FilterTracksPipe } from './pipes'

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    FilterTracksPipe,
    OrderTracksByPipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
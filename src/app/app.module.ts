import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TrackerModule} from './tracker/tracker.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

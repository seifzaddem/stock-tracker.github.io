import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {TrackStockComponent} from './main/components/track-stock/track-stock.component';

@NgModule({
  declarations: [
    MainComponent,
    TrackStockComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TrackerModule {
}

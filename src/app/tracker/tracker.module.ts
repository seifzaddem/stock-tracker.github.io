import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {TrackStockComponent} from './components/track-stock/track-stock.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StockService} from './services/stock.service';

@NgModule({
  declarations: [
    MainComponent,
    TrackStockComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    StockService
  ]
})
export class TrackerModule {
}

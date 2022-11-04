import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockTrackerContainerComponent} from './pages/stock-tracker-container.component';
import {TrackStockComponent} from './components/track-stock/track-stock.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StockService} from './services/stock.service';
import {StockInfoComponent} from './components/stock-info/stock-info.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {API_KEY, API_TOKEN, API_URL} from './constants/api.constants';
import {environment} from '../../environments/environment';
import {ApiInterceptor} from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    StockTrackerContainerComponent,
    TrackStockComponent,
    StockInfoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StockService,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: API_KEY, useValue: environment.apiKey},
    {provide: API_TOKEN, useValue: environment.apiToken},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ]
})
export class TrackerModule {
}

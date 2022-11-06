import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockTrackerComponent} from './tracker/pages/stock-tracker/stock-tracker.component';
import {SentimentComponent} from './tracker/pages/sentiment/sentiment.component';

const routes: Routes = [
  {path: '', component: StockTrackerComponent},
  {path: 'sentiment/:symbol', component: SentimentComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

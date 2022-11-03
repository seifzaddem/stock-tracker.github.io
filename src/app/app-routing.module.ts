import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockTrackerContainerComponent} from './tracker/container/stock-tracker-container.component';

const routes: Routes = [
  {path: '', component: StockTrackerContainerComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

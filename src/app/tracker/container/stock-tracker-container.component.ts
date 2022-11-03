import {Component, OnInit} from '@angular/core';
import {StockService} from '../services/stock.service';

@Component({
  selector: 'st-main',
  templateUrl: './stock-tracker-container.component.html',
  styleUrls: ['./stock-tracker-container.component.scss']
})
export class StockTrackerContainerComponent implements OnInit {

  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
  }

  trackStock(stock: string) {
    this.stockService.trackStock(stock);
  }
}

import {Component, OnInit} from '@angular/core';
import {StockService} from '../services/stock.service';

@Component({
  selector: 'st-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
  }

  trackStock(stock: string) {
    this.stockService.trackStock(stock);
  }
}

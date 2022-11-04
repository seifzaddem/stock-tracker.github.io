import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockModel} from '../../models/stock.model';

const enum direction {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
  CONSTANT = "CONSTANT"
}

@Component({
  selector: 'st-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {

  ascending = direction.ASCENDING;
  descending = direction.DESCENDING;
  constant = direction.CONSTANT;

  arrow: direction;

  @Input()
  stockModels: StockModel[];

  @Output()
  removeSymbol = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getStockVariation(stock: StockModel): direction {
    return stock.quote.percentChange > 0 ? this.ascending : stock.quote.percentChange < 0 ? this.descending : this.constant;
  }

  removeStock(symbol: string): void {
    this.removeSymbol.emit(symbol);
  }


  getStockId(symbol: string): string {
    return `remove${symbol}`;
  }

  getSentimentId(symbol: string): string {
    return `sentiment${symbol}`;
  }
}

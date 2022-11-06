import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockModel, StockVariation} from '../../models/stock.model';

@Component({
  selector: 'st-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {

  ascending = StockVariation.ASCENDING;
  descending = StockVariation.DESCENDING;
  constant = StockVariation.CONSTANT;
  
  @Input()
  stockModels: StockModel[];

  @Output()
  removeSymbol = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getStockVariation(stock: StockModel): StockVariation {
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

  goToSentiment(symbol: string): string[] {
    return ['sentiment', symbol];
  }
}

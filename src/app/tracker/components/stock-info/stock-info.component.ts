import {Component, Input, OnInit} from '@angular/core';
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

  constructor() {
  }

  ngOnInit(): void {
  }

  getStockVariation(stock: StockModel): direction {
    return stock.quote.currentPrice > 0 ? this.ascending : stock.quote.currentPrice < 0 ? this.descending : this.constant;
  }
}

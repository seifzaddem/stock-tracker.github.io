import {Injectable} from '@angular/core';
import {Logger} from '../../shared/services/logger.service';

const STOCK_LIST_KEY = 'STOCK_LIST_KEY';

@Injectable()
export class StockService {

  constructor(private logger: Logger) {
  }

  trackStock(stock: string) {
    let stockList = this.getStockList();
    if (!stockList.includes(stock.toLowerCase())) {
      stockList.push(stock.toLowerCase());
      localStorage.setItem(STOCK_LIST_KEY, JSON.stringify(stockList));
    }
  }

  getStockList(): string[] {
    let unparsedStockList = localStorage.getItem(STOCK_LIST_KEY);
    let parsedStockList: string[] = [];
    if (unparsedStockList) {
      try {
        parsedStockList = JSON.parse(unparsedStockList);
        if (!Array.isArray(parsedStockList) || !parsedStockList.every(elt => typeof elt === 'string')) {
          this.logger.error(`Unable to parse data from Local Storage ${unparsedStockList}`);
          parsedStockList = [];
        }
      } catch (e) {
        this.logger.error(`Unable to parse data from Local Storage ${unparsedStockList}`);
      }
    }
    return parsedStockList;
  }

}


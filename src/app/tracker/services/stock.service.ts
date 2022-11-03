import {Injectable} from '@angular/core';
import {Logger} from '../../shared/services/logger.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiQuote, StockQuote} from '../models/quote.model';

const STOCK_LIST_KEY = 'STOCK_LIST_KEY';

@Injectable()
export class StockService {

  constructor(private logger: Logger, private httpClient: HttpClient) {
  }

  trackStock(stock: string): void {
    let stockList = this.getStockList();
    if (!stockList.includes(stock.toUpperCase())) {
      stockList.push(stock.toUpperCase());
      localStorage.setItem(STOCK_LIST_KEY, JSON.stringify(stockList));
    }
  }

  fetchQuote(stock: string): Observable<StockQuote> {
    const params = new HttpParams().append('symbol', stock);
    return this.httpClient.get<ApiQuote>('quote', {params})
      .pipe(
        map(value => {
          return {
            currentPrice: value.c,
            highPrice: value.h,
            openingPrice: value.o,
            previousClosingPrice: value.pc
          };
        })
      );
  }

  getStockList(): string[] {
    let unparsedStockList = localStorage.getItem(STOCK_LIST_KEY);
    let parsedStockList: string[] = [];
    if (unparsedStockList) {
      try {
        parsedStockList = JSON.parse(unparsedStockList);
        if (!Array.isArray(parsedStockList) || !parsedStockList.every(stock => typeof stock === 'string')) {
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


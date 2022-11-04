import {Injectable} from '@angular/core';
import {Logger} from '../../shared/services/logger.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {QuoteModel, ResultQuote} from '../models/quote.model';
import {SymbolSearchModel, SymbolSearchResultModel} from '../models/symbol-search.model';
import {StockModel} from '../models/stock.model';

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

  fetchStockSymbol(symbol: string): Observable<SymbolSearchResultModel> {
    const params = new HttpParams().append('q', symbol);
    return this.httpClient.get<SymbolSearchModel>('search', {params}).pipe(
      map(symbolSearch => {
          if (symbolSearch.count == 0) {
            throw new Error(symbol);
          } else {
            const symbolSearchModel = symbolSearch.result.find(symbolSearchResultModel => symbolSearchResultModel.symbol == symbol);
            if (!symbolSearchModel) {
              throw new Error(symbol);
            }
            return symbolSearchModel;
          }
        }
      )
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

  fetchStock(stockSymbol: string): Observable<StockModel> {
    const quote$ = this.fetchQuote(stockSymbol);
    const stockSymbolResult$ = this.fetchStockSymbol(stockSymbol);
    type forkJoinResult = [quote: QuoteModel, stockSymbolResult: SymbolSearchResultModel];

    return forkJoin([quote$, stockSymbolResult$]).pipe(
      map<forkJoinResult, StockModel>(([quote, stockSymbolResult]: forkJoinResult) => {
        return {
          quote: quote,
          symbol: stockSymbolResult.symbol,
          name: stockSymbolResult.description
        }
      })
    );
  }

  fetchQuote(stock: string): Observable<QuoteModel> {
    const params = new HttpParams().append('symbol', stock);
    return this.httpClient.get<ResultQuote>('quote', {params})
      .pipe(
        map(value => {
          return {
            percentChange: value.dp,
            currentPrice: value.c,
            highPrice: value.h,
            openingPrice: value.o,
            previousClosingPrice: value.pc
          };
        })
      );
  }

  removeStock(symbol: string, stockSymbols: string[]): void {
    const newStockSymbols = stockSymbols.filter((value) => value != symbol);
    localStorage.setItem(STOCK_LIST_KEY, JSON.stringify(newStockSymbols));
  }
}


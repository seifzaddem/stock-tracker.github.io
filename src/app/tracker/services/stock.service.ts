import {Injectable} from '@angular/core';
import {Logger} from '../../shared/services/logger.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {QuoteModel, ResultQuote} from '../models/quote.model';
import {SymbolDescriptionModel, SymbolDescriptionsSearchModel} from '../models/symbol-description.model';
import {StockModel} from '../models/stock.model';
import {SentimentData, SentimentModel, SentimentResult} from '../models/sentiment.model';

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

  fetchStockSymbol(symbol: string): Observable<SymbolDescriptionModel> {
    const requestedSymbol = symbol.toUpperCase();
    const params = new HttpParams().append('q', requestedSymbol);
    return this.httpClient.get<SymbolDescriptionsSearchModel>('search', {params}).pipe(
      map(symbolSearch => {
          if (symbolSearch.count == 0) {
            throw new Error(requestedSymbol);
          } else {
            const symbolSearchModel = symbolSearch.result.find(symbolSearchResultModel => symbolSearchResultModel.symbol == requestedSymbol);
            if (!symbolSearchModel) {
              throw new Error(requestedSymbol);
            }
            return symbolSearchModel;
          }
        }
      )
    );
  }

  fetchStockSentiment(symbol: string, startDate: Date, endDate: Date): Observable<SentimentModel> {
    const params = new HttpParams()
      .append('symbol', symbol.toUpperCase())
      .append('from', formatDateToString(startDate))
      .append('to', formatDateToString(endDate));
    return this.httpClient.get<SentimentResult>('stock/insider-sentiment', {params}).pipe(
      map(sentimentResult => {
        const mappedSentiment: SentimentData[] = sentimentResult.data.map(
          sentiment => ({
            symbol: symbol,
            date: new Date(`${sentiment.year}-${addLeadingZero(sentiment.month)}-01`),
            change: sentiment.change,
            mspr: sentiment.mspr,
          })
        );
        return {
          symbol: symbol,
          data: mappedSentiment
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

  fetchStock(stockSymbol: string): Observable<StockModel> {
    const quote$ = this.fetchQuote(stockSymbol);
    const stockSymbolResult$ = this.fetchStockSymbol(stockSymbol);

    return forkJoin([quote$, stockSymbolResult$]).pipe(
      map(([quote, stockSymbolResult]) => {
        return {
          quote: quote,
          symbol: stockSymbolResult.symbol,
          name: stockSymbolResult.description
        }
      })
    );
  }

  fetchQuote(stock: string): Observable<QuoteModel> {
    const requestedStock = stock.toUpperCase();
    const params = new HttpParams().append('symbol', requestedStock);
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

function formatDateToString(date: Date): string {
  let day = addLeadingZero(date.getDate());
  let month = addLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function addLeadingZero(numberToPad: number) {
  return numberToPad.toString().padStart(2, '0');
}


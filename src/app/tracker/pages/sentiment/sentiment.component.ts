import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, forkJoin, Subject, switchMap, tap} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {StockService} from '../../services/stock.service';
import {SentimentModel} from '../../models/sentiment.model';
import {Logger} from '../../../shared/services/logger.service';
import {SymbolDescriptionModel} from '../../models/symbol-description.model';
import {StockVariation} from '../../models/stock.model';

@UntilDestroy()
@Component({
  selector: 'st-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {

  ascending = StockVariation.ASCENDING;
  descending = StockVariation.DESCENDING;
  constant = StockVariation.CONSTANT;

  symbol: string;
  stockName: string
  triggerSentimentSearch$ = new Subject<SentimentModel>();
  triggerStockAndSentimentSearch$ = new Subject<string>();
  stock$ = new Subject<{ symbolDescription: SymbolDescriptionModel, sentiment: SentimentModel }>();

  constructor(private activatedRoute: ActivatedRoute, private stockService: StockService, private logger: Logger) {
  }

  ngOnInit(): void {

    this.triggerStockAndSentimentSearch$.asObservable().pipe(
      switchMap(stockSymbol => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 2);
        return forkJoin([this.stockService.fetchStockSymbol(stockSymbol),
          this.stockService.fetchStockSentiment(stockSymbol, startDate, endDate)])
      }),
      tap(([symbolDescription, sentiment]) => {
        this.stockName = symbolDescription.description;
        this.stock$.next({symbolDescription: symbolDescription, sentiment: sentiment});
      }),
      catchError((err, caught) => {
        this.logger.warn(`Unable to find a matching stock for this symbol : ${err.message}`);
        return caught;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        this.symbol = paramMap.get('symbol') as string;
        this.triggerStockAndSentimentSearch$.next(this.symbol);
      }),
      untilDestroyed(this)
    ).subscribe();

  }

  getStockVariation(change: number): StockVariation {
    return change > 0 ? this.ascending : change < 0 ? this.descending : this.constant;
  }
}


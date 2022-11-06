import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {catchError, mergeMap, Subject, tap} from 'rxjs';
import {StockModel} from '../../models/stock.model';
import {Logger} from '../../../shared/services/logger.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'st-main',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.scss']
})
export class StockTrackerComponent implements OnInit {

  stockSymbols: string[];
  stockModels: StockModel[] = [];
  triggerStockSearch$ = new Subject<string>();

  constructor(private stockService: StockService, private logger: Logger) {
  }

  ngOnInit(): void {
    this.triggerStockSearch$.asObservable().pipe(
      mergeMap(stockSymbol => this.stockService.fetchStock(stockSymbol)),
      tap(stockModel => this.stockModels.push(stockModel)),
      catchError((err, caught) => {
        this.logger.warn(`Unable to find a matching stock for this symbol : ${err.message}`);
        this.stockService.removeStock(err.message, this.stockSymbols);
        return caught;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.stockSymbols = this.stockService.getStockList();
    for (let stockSymbol of this.stockSymbols) {
      this.triggerStockSearch$.next(stockSymbol);
    }

  }

  trackStock(stockSymbol: string): void {
    this.stockService.trackStock(stockSymbol);
    this.triggerStockSearch$.next(stockSymbol);
  }

  removeSymbol(symbol: string): void {
    this.stockService.removeStock(symbol, this.stockSymbols);
    this.stockModels = this.stockModels.filter(stock => stock.symbol != symbol);
  }
}

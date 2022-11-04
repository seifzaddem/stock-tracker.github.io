import {QuoteModel} from './quote.model';

export interface StockModel {
  symbol: string;
  name: string;
  quote: QuoteModel;
}

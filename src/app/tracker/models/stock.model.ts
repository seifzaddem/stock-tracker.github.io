import {QuoteModel} from './quote.model';

export interface StockModel {
  symbol: string;
  name: string;
  quote: QuoteModel;
}

export enum StockVariation {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
  CONSTANT = "CONSTANT"
}

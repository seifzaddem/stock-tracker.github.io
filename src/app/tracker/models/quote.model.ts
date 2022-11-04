export interface QuoteModel {
  percentChange: number;
  currentPrice: number;
  openingPrice: number;
  highPrice: number;
  previousClosingPrice: number;
}

export interface ResultQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface StockQuote {
  currentPrice: number;
  openingPrice: number;
  highPrice: number;
  previousClosingPrice: number;
}

export interface ApiQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface SymbolSearchModel {
  count: number;
  result: SymbolSearchResultModel[];
}

export interface SymbolSearchResultModel {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

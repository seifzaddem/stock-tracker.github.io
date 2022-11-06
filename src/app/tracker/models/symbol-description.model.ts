export interface SymbolDescriptionsSearchModel {
  count: number;
  result: SymbolDescriptionModel[];
}

export interface SymbolDescriptionModel {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

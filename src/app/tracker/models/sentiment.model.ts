export interface SentimentModel {
  data: SentimentData[];
  symbol: string;
}

export interface SentimentResult {
  data: SentimentResultData[];
  symbol: string;
}

export interface SentimentResultData {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

export interface SentimentData {
  symbol: string;
  date: Date;
  change: number;
  mspr: number;
}

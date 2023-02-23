export interface HistoricalData {
  inputValue: number | undefined;
  convertedValue: number;
  selectedCurrecyFrom: string;
  selectedCurrecyTo: string;
}

export interface ExchangeRate {
  [key: string]: number | string;
}

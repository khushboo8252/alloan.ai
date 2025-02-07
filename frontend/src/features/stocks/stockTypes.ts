export interface Stock {
    id: string;
    name: string;
    symbol: string;
    available: string[];
  }
  
  export interface StockDataPoint {
    timestamp: string;
    price: number;
  }
  
  export interface StockState {
    stocks: Stock[];
    selectedStock: Stock | null;
    duration: string;
    graphData: StockDataPoint[];
    loading: boolean;
  }
  
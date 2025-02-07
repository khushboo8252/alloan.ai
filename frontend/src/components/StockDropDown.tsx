import React from "react";


interface StockDropdownProps {
  selectedStock: string;
  onStockChange: (stockId: string) => void;
}

const StockDropdown: React.FC<StockDropdownProps> = ({ selectedStock, onStockChange }) => {
  const stockList = {
    "f47ac10b-58cc-4372-a567-0e02b2c3d479": { name: "Apple Inc.", symbol: "AAPL:NASDAQ" },
    "7c9e6679-7425-40de-944b-e07fc1f90ae7": { name: "Microsoft Corporation", symbol: "MSFT:NASDAQ" },
    "550e8400-e29b-41d4-a716-446655440000": { name: "NVIDIA Corporation", symbol: "NVDA:NASDAQ" },
  };

  return (
    <div className="stock-dropdown">
      <label className="stock-label">Select a Stock</label>
      <select
        value={selectedStock}
        onChange={(e) => onStockChange(e.target.value)}
        className="stock-select"
      >
        {Object.entries(stockList).map(([id, stock]) => (
          <option key={id} value={id}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockDropdown;

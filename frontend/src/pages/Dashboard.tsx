import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockDropdown from "../components/StockDropDown";
import DurationSelector from "../components/DurationSelector";
import StockGraph from "../components/StockGraph";
import { loadStocks, selectStock } from "../features/stocks/stockSlice";
import { RootState } from "../store/store";
import Login from "../components/Login";
import StockGraphContainer from "../stockGraphContainer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stocks.stocks);
  const loading = useSelector((state: RootState) => state.stocks.loading);
  const selectedStock = useSelector((state: RootState) => state.stocks.selectedStock);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("1M"); // Default duration

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadStocks() as any);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated && !selectedStock && stocks.length > 0) {
      dispatch(selectStock(stocks[0]));
    }
  }, [stocks, selectedStock, isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) return <div className="dashboard-message">Loading stocks...</div>;
  if (!stocks.length) return <div className="dashboard-message">No stocks available</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Stock Dashboard</h1>
      <div className="dashboard-card">
        {/* Stock Dropdown */}
        <StockDropdown
          selectedStock={selectedStock?.id || stocks[0]?.id}
          onStockChange={(stockId) => {
            const stock = stocks.find((s) => s.id === stockId);
            if (stock) dispatch(selectStock(stock));
          }}
        />

        {/* Duration Selector */}
        {/* <DurationSelector onDurationChange={setSelectedDuration} /> */}

        {/* Stock Graph with selected duration */}
        {/* {selectedStock?.id && (
          <div className="stock-graph">
            <StockGraph stockId={selectedStock.id} selectedDuration={selectedDuration} />
          </div>
        )} */}
        <StockGraphContainer/>
      </div>
    </div>
  );
};

export default Dashboard;

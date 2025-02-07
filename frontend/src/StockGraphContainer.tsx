import React, { useState } from "react";
import StockGraph from "./components/StockGraph";

const StockGraphContainer: React.FC = () => {
  const [selectedDuration1, setSelectedDuration1] = useState("1M");
  const [selectedDuration2, setSelectedDuration2] = useState("3M");

  return (
    <div className="stock-graph-container">
      <div>
        <label>Duration 1: </label>
        <select
          value={selectedDuration1}
          onChange={(e) => setSelectedDuration1(e.target.value)}
        >
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>
      </div>

      <div>
        <label>Duration 2: </label>
        <select
          value={selectedDuration2}
          onChange={(e) => setSelectedDuration2(e.target.value)}
        >
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockGraph stockId="AAPL" selectedDuration={selectedDuration1} />
        <StockGraph stockId="AAPL" selectedDuration={selectedDuration2} />
      </div>
    </div>
  );
};

export default StockGraphContainer;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

interface StockGraphProps {
  stockId: string;
  selectedDuration: string; // New prop for duration
}

const StockGraph: React.FC<StockGraphProps> = ({ stockId, selectedDuration }) => {
  const [stockData, setStockData] = useState<{ date: string; price: number }[]>([]);

  useEffect(() => {
    // Mock API call - Simulate fetching stock data based on duration
    const fetchData = async () => {
      let days = 5; // Default duration

      if (selectedDuration === "1M") days = 30;
      else if (selectedDuration === "3M") days = 90;
      else if (selectedDuration === "6M") days = 180;
      else if (selectedDuration === "1Y") days = 365;

      const mockStockData = Array.from({ length: days / 5 }, (_, i) => ({
        date: `2024-${(i % 12) + 1}-01`,
        price: Math.random() * 200,
      }));

      setStockData(mockStockData);
    };

    fetchData();
  }, [stockId, selectedDuration]); // Fetch data when stockId or duration changes

  const data = {
    labels: stockData.map((point) => point.date),
    datasets: [
      {
        label: "Stock Price",
        data: stockData.map((point) => point.price),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  return (
    <div className="stock-graph">
      <h2 className="stock-graph-title">Stock Graph ({selectedDuration})</h2>
      <Line data={data} />
    </div>
  );
};

export default StockGraph;

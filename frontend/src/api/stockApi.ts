import axios from 'axios';

export const fetchStocks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/stocks'); // Fetch all stocks
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw error;
  }
};

export const fetchStockData = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/stocks/${id}`); // Changed POST to GET
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock data for ${id}:`, error);
    throw error;
  }
};

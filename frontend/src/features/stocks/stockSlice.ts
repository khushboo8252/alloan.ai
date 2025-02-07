import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchStocks, fetchStockData } from "../../api/stockApi"; // ✅ Correct import
import { Stock, StockDataPoint, StockState } from "./stockTypes";

// Async thunk to load stocks
export const loadStocks = createAsyncThunk("stocks/loadStocks", async () => {
  return await fetchStocks();
});

// Async thunk to load stock data
export const loadStockData = createAsyncThunk(
  "stocks/loadStockData",
  async (id: string, { dispatch }) => {
    let entries: StockDataPoint[] = [];
    let retry = true;

    while (retry) {
      const data = await fetchStockData(id);
      if (data.length === 0) {
        retry = false;
      } else {
        entries = [...entries, ...data];
        dispatch(setGraphData(entries)); // ✅ Dispatch updated graph data
      }
      await new Promise((res) => setTimeout(res, 2000)); // Simulate real-time fetching
    }
    return entries; // ✅ Return final set of entries
  }
);

// Initial state
const initialState: StockState = {
  stocks: [],
  selectedStock: null,
  duration: "",
  graphData: [],
  loading: false,
};

// Create the slice
const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    selectStock: (state, action: PayloadAction<Stock>) => {
      state.selectedStock = action.payload;
      state.duration = action.payload.available[0]; // ✅ Set default duration
      state.graphData = []; // ✅ Clear graph data when selecting a new stock
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
      state.graphData = []; // ✅ Clear graph data when duration changes
    },
    setGraphData: (state, action: PayloadAction<StockDataPoint[]>) => {
      state.graphData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(loadStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.graphData = action.payload; // ✅ Store fetched stock data
      })
      .addCase(loadStockData.rejected, (state) => {
        state.loading = false; // ✅ Reset loading state on failure
      });
  },
});

// Export actions and selectors
export const { selectStock, setDuration, setGraphData } = stockSlice.actions;
export default stockSlice.reducer;

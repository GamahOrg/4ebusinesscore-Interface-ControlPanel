// PartsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "../../models/cardparts/Card";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
interface PartsState {
  data: Card[];
  loading: boolean;
  error: null | string;
}

// Replace 'YourPartsDataType' with the actual type of your Parts data

// Define the initial state
const initialState: PartsState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching statistics
export const fetchParts = createAsyncThunk<any, string>(
  "Parts/fetchParts",
  async (id, { rejectWithValue }) => {
    try {
      // const response = await userAggregatorApiConsume.getParts(id)
      const response = await ControlPanelAggConsume.getMyWorkspaces({
        componentId: id,
      });

      return response.result;
    } catch (error: any) {
      // Handle errors and provide meaningful error messages
      return rejectWithValue(error.message || "Failed to fetch Parts");
    }
  }
);

// Parts slice
const PartsSlice = createSlice({
  name: "Parts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload as Card[];
      })
      .addCase(fetchParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PartsSlice.reducer;

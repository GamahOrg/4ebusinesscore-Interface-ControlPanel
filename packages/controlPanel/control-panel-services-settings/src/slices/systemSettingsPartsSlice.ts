// PartsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { Card } from "../../../controlpanel-usermanagement/src/app/models/cardparts/Card";
interface PartsState {
  data: Card[];
  loading: boolean;
  error: null | string;
}

const initialState: PartsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSystemSettingsParts = createAsyncThunk<any, string>(
  "SystemParts/fetchSystemPartsParts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ControlPanelAggConsume.getMyWorkspaces({
        componentId: id,
      });
      return response.result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch Parts");
    }
  }
);

const PartsSlice = createSlice({
  name: "SystemParts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemSettingsParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemSettingsParts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload as Card[];
      })
      .addCase(fetchSystemSettingsParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PartsSlice.reducer;

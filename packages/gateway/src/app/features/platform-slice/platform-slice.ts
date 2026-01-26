import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlatformModel } from "../../models/platform/platform-model";
// import { PlatformConsume } from "../../services/platform/platform-axios";
import { PlatformConsume } from "@4eplatform/shared/apis/system_setting";

import { ResponseModel } from "../../models/response-model";
import {
  PlatformModelSitesTab1,
  PlatformModelSitesTab1Array,
} from "../../models/platform/sites-model";

export const fetchPlatform = createAsyncThunk<ResponseModel>(
  "fetchPlatform",
  async () => {
    const response = await PlatformConsume.getAllPlatform();
    return response;
  }
);
export const fetchPlatformSites = createAsyncThunk<ResponseModel, any>(
  "fetchPlatformSites",
  async (data: any) => {
    const response = await PlatformConsume.getAllSites({
      pageSize: data?.pageSize,
      pageIndex: data?.pageIndex,
    });
    return response;
  }
);

interface PlatformState {
  data: PlatformModel;
  sitesData: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: PlatformState = {
  sitesData: {},
  data: new PlatformModel(),
  loading: false,
  error: null,
  message: "",
};

const PlatformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformSites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlatformSites.fulfilled, (state, action) => {
        state.sitesData.data = action.payload.result;
        state.sitesData.totalItems = action.payload.totalItems as number;
        state.sitesData.totalPages = action.payload.totalPages as number;
      })
      .addCase(fetchPlatformSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchPlatform.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlatform.fulfilled, (state, action) => {
        state.data = action.payload.result as PlatformModel;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default PlatformSlice.reducer;

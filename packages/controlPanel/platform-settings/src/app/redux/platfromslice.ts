import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlatformConsume } from "@4eplatform/shared/apis/system_setting";

import { ResponseModel } from "../partials/response-model";

export const fetchPlatform = createAsyncThunk<ResponseModel, any>(
  "fetchPlatform",
  async (params: any = {}) => {
    const response = await PlatformConsume.getAllPlatform(params);
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
export const addSites = createAsyncThunk<ResponseModel, any>(
  "addSites",
  async (data: any) => {
    const response = await PlatformConsume.postMainSites(data);
    return response;
  }
);
export const deleteSite = createAsyncThunk<ResponseModel, any>(
  "deleteSite",
  async (id: any) => {
    const response = await PlatformConsume.deleteSite(id);
    return response;
  }
);
interface PlatformState {
  data: any;
  sitesData: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: PlatformState = {
  sitesData: {},
  data: {},
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
        state.data = action.payload.result as object;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addSites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(addSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteSite.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSite.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(deleteSite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default PlatformSlice.reducer;

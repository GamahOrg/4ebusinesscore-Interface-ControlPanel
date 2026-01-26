import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../partials/response-model";
import { PlatformConsume } from "@4eplatform/shared/apis/system_setting";
import {
  MainSettingsHeader,
  ModelMainSettingsHeader,
  MainSettingHeadersValues,
} from "../model/main-settings-header";

interface PlatformState {
  data: ModelMainSettingsHeader;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: PlatformState = {
  data: new ModelMainSettingsHeader(new MainSettingsHeader("", [])),
  status: "idle",
  error: null,
  message: "",
  // MainSettingHeaders:[]
};

export const editMainSettingsHeader = createAsyncThunk<ResponseModel, any>(
  "editPlatformMainSettings",
  async (data: any, id: any) => {
    try {
      const response = await PlatformConsume.putMainSettingHeaders(data);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const deleteMainSettingsHeader = createAsyncThunk<any, any>(
  "deletePlatformMainSettings",
  async (id: string) => {
    try {
      const response = await PlatformConsume.deleteMainSettingHeaders(id);
      // const result = { id, response };
      return response;
    } catch (err: any) {
      return err;
    }
  }
);

const MainSettingsHeaderSlice = createSlice({
  name: "PlatformMainSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editMainSettingsHeader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMainSettingsHeader.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editMainSettingsHeader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteMainSettingsHeader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMainSettingsHeader.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.data.MainSettingHeaders =
          state.data.data.MainSettingHeaders.filter(
            (header) => header.id !== action.payload
          );
      })
      .addCase(deleteMainSettingsHeader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default MainSettingsHeaderSlice.reducer;

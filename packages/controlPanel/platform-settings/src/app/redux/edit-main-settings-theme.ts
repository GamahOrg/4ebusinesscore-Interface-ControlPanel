import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../partials/response-model";
import { PlatformConsume } from "@4eplatform/shared/apis/system_setting";
import { PlatformModelMainSettingsArray } from "../model/main-settings-theme";

interface PlatformState {
  data: PlatformModelMainSettingsArray[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: PlatformState = {
  data: [],
  status: "idle",
  error: null,
  message: "",
};

export const editMainSettingsIsTheme = createAsyncThunk<ResponseModel, any>(
  "editPlatformMainSettings",
  async (data: any, id: any) => {
    try {
      const response = await PlatformConsume.putPlatformSettings(data);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

const EditMainSettingsIsThemeSlice = createSlice({
  name: "EditPlatformMainSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editMainSettingsIsTheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMainSettingsIsTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editMainSettingsIsTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default EditMainSettingsIsThemeSlice.reducer;

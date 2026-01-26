import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../partials/response-model";
import { PlatformConsume } from "@4eplatform/shared/apis/system_setting";

interface PlatformState {
  data: [];
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

export const editSignInSettings = createAsyncThunk<ResponseModel, any>(
  "SignInPlatformSettings/putPlatformSettings",
  async (data: any) => {
    try {
      const response = await PlatformConsume.putMainSettingLogin(data);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const deleteMainSettingLogin = createAsyncThunk<ResponseModel, any>(
  'SignInPlatformSettings/deleteMainSettingLogin', 
  async (id: any) => {
  const response = await PlatformConsume.deleteMainSettingLogin(id)
  return response
})

const EditSignInSettingsSlice = createSlice({
  name: "SignInPlatformSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editSignInSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSignInSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editSignInSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      }).addCase(deleteMainSettingLogin.pending, (state) => {
      }).addCase(deleteMainSettingLogin.fulfilled, (state, action) => {
        state.error = null
        state.message = 'success'
      }).addCase(deleteMainSettingLogin.rejected, (state, action) => {
        state.error = action.error.message as string
      })
  },
});

export default EditSignInSettingsSlice.reducer;

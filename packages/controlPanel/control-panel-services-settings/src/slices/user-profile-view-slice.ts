import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchUserView = createAsyncThunk<ResponseModel, any>(
  "user-profile-view/fetchUserView",
  async (data: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getUserView();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface UserData {
  data: any;
  status: string;
  totalPages: number;
  message: string;
}

let initialState: UserData = {
  data: {},
  status: "idle",
  totalPages: 0,
  message: "",
};

const userViewSlice = createSlice({
  name: "user-profile-view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserView.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserView.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as any;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchUserView.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default userViewSlice.reducer;

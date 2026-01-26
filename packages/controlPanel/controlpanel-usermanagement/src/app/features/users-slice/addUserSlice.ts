import { ResponseModel } from "./../../models/response-model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const addUser = createAsyncThunk<ResponseModel, any>(
  "addUser",
  async (data: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.AddUser(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addUser.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addUser.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addUserSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WorkSpace } from "../models/WorkSpace";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface initialStateType {
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
}
const initialState: initialStateType = {
  status: "idle",
  message: null,
};
export const addWorkSpace = createAsyncThunk(
  "addWorkSpace",
  async (data: WorkSpace, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.AddWorkSpace(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const addWorkSpaceSlice = createSlice({
  name: "addWorkSpace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWorkSpace.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addWorkSpace.fulfilled,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "succeeded";
          //   state.message = "product added successfully";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addWorkSpace.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          //   state.message = "failed in add product";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addWorkSpaceSlice.reducer;

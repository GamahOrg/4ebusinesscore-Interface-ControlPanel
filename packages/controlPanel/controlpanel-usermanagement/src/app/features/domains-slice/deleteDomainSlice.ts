// productSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const deleteDomain = createAsyncThunk<
  ResponseModel,
  number | Number | string
>("deleteDomain", async (id: number | Number | string, thunkApi) => {
  try {
    let response = await UserManagmentConsume.deleteDomain(id);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const deleteDomainSlice = createSlice({
  name: "deleteDomain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDomain.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        deleteDomain.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteDomain.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default deleteDomainSlice.reducer;

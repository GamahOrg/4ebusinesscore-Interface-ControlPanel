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

export const deleteRole = createAsyncThunk<
  ResponseModel,
  number | Number | string
>("deleteRole", async (id: number | Number | string, thunkApi) => {
  try {
    let response = await UserManagmentConsume.delete(id);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const deleteRoleSlice = createSlice({
  name: "deleteRole",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRole.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        deleteRole.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteRole.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default deleteRoleSlice.reducer;

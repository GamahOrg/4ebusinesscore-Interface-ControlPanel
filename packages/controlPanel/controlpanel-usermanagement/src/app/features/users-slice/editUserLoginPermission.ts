import { ResponseModel } from "./../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const editUserLoginPermission = createAsyncThunk<ResponseModel, any>(
  "editUserLoginPermission",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.editLoginPermission(
        data?.id,
        data?.body
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const editUserLoginPermissionSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserLoginPermission.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        editUserLoginPermission.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editUserLoginPermission.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default editUserLoginPermissionSlice.reducer;

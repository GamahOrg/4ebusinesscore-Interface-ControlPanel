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

interface changePassword {
  oldPassword: string;
  newPassword: string;
  id?: number | Number | string;
}
export const changePassword = createAsyncThunk<ResponseModel, changePassword>(
  "changePassword",
  async (updatedData: changePassword, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.editUserPassword({
        body: {
          oldPassword: updatedData?.oldPassword,
          newPassword: updatedData?.newPassword,
        },
        id: updatedData?.id,
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(
        changePassword.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        changePassword.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default changePasswordSlice.reducer;

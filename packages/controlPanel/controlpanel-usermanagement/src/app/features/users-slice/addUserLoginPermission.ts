import { ResponseModel } from "./../../models/response-model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const addUserLoginPermission = createAsyncThunk<ResponseModel, any>(
  "addUserLoginPermission",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.addLoginPermission({
        id:data?.id,
        isNafaz: data?.isNafaz,
        isExpired: data?.isExpired,
        expirationDateFrom: data?.expirationDateFrom,
        expirationDateTo: data?.expirationDateTo,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const addUserLoginPermissionSlice = createSlice({
  name: "addUserLoginPermission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserLoginPermission.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addUserLoginPermission.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addUserLoginPermission.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addUserLoginPermissionSlice.reducer;

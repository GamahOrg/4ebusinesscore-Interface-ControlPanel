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

export const deleteRoleFromUser = createAsyncThunk<ResponseModel, any>(
  "deleteRoleFromUser",
  async (data, thunkApi) => {
    try {
      var role = [];
      role.push(data?.roleId);
      let response = await UserManagmentConsume?.deleteRoleFromUser({
        userId: data?.id,
        rolesId:role,
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const deleteRoleFromUserSlice = createSlice({
  name: "deleteRoleFromUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRoleFromUser.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        deleteRoleFromUser.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteRoleFromUser.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default deleteRoleFromUserSlice.reducer;

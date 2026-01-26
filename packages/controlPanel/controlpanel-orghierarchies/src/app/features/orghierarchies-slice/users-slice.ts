import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UsersModel } from "../../models/users-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchUsers = createAsyncThunk<ResponseModel, any>(
  "users/fetchUsers",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllUsers({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        userName: data?.userName,
        isExpired: data?.isExpired,
        isNafaz: data?.isNafaz,
        lastLoginTime: data?.lastLoginTime,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface users {
  data: UsersModel[];
  totalPages: number;
  totalItems: number;
  status: string;
  message: string;
}
let initialState: users = {
  data: [],
  totalPages: 1,
  totalItems: 1,
  status: "idle",
  message: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: users) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: users, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as UsersModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchUsers.rejected,
        (state: users, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        }
      );
  },
});

export default usersSlice.reducer;

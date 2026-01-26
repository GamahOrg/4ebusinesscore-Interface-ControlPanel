import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { RequestsUsersModel } from "../../models/requests-users/requestsUsersModel";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchRequestsUsers = createAsyncThunk<ResponseModel, any>(
  "requestsUsers/fetchRequestsUsers",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllRequestsUsers({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface users {
  data:RequestsUsersModel[];
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

const requestsUsersSlice= createSlice({
  name: "requestsUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsUsers .pending, (state: users) => {
        state.status = "loading";
      })
      .addCase(
        fetchRequestsUsers.fulfilled,
        (state: users, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as RequestsUsersModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchRequestsUsers.rejected,
        (state: users, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        }
      );
  },
});

export default requestsUsersSlice.reducer;

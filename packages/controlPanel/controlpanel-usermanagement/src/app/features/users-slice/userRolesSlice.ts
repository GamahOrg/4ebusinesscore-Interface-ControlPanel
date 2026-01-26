import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userRoleModel } from "../../models/users/user-role-model";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchUserRoles = createAsyncThunk<ResponseModel, any>(
  "userRoles/fetchUserRoles",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllUserRoles
        (
          data.id, {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface userRoles {
  data: userRoleModel[];
  status: string;
  message: string;
}

let initialState: userRoles = {
  data: [],
  status: "idle",
  message: "",
};

const userRolesSlice = createSlice({
  name: "userRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state: userRoles) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserRoles.fulfilled,
        (state: userRoles, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as userRoleModel[];
        }
      )
      .addCase(
        fetchUserRoles.rejected,
        (state: userRoles, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default userRolesSlice.reducer;

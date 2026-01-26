import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Permission } from "../../models/users/PermissionMoodel";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface PermissionsState {
  userPermissions: [Permission];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PermissionsState = {
  userPermissions: [new Permission("", false, "", "", "", "")],
  status: "idle",
  error: null,
};

export const fetchUserPermissions = createAsyncThunk(
  "permissions/fetchUserPermissions",
  async (userId: string, thunkAPI) => {
    const response = await UserManagmentConsume.getPermission(userId);
    return response;
  }
);

// Create the permissions slice
const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPermissions = action.payload?.result as [Permission];
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default permissionsSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { roleCategory } from "../../models/role-category/role-category-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchCategoryRoles= createAsyncThunk<ResponseModel>(
  "roles/fetchCategoryRoles",
  async () => {
    const response = await UserManagmentConsume.getAllRolesCategory();
    return response;
  }
);

interface RolesCategory {
  data: roleCategory[];
  status: string;
  message: string;
}
let initialState: RolesCategory = {
  data: [],
  status: "idle",
  message: "",
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryRoles.pending, (state: RolesCategory) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoryRoles.fulfilled,
        (state: RolesCategory, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as roleCategory[];
        //   state.message = action.payload.message
          // state.message=action.payload
        }
      )
      .addCase(
        fetchCategoryRoles.rejected,
        (state: RolesCategory, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message
          // state.message=action.payload
        }
      );
  },
});

export default rolesSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RoleModelArray, role } from "../../models/role/role-model";
import { postRole } from "../../models/role/post-role";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { edittRoleModel } from "../../models/role/edit-role";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { Pagination } from "@4eplatform/shared/models/Pagination";

interface roles {
  data: RoleModelArray;
  status: string;
  message: string;
  pagination:Pagination;
  role: role;
}
let initialState: roles = {
  data: new RoleModelArray([], 0, 0),
  status: "idle",
  message: "",
  pagination: new  Pagination(),
  role: new role("", "", "", "", "", 0, "", "", ""),
};

export const fetchRoles = createAsyncThunk<ResponseModel, any>(
  "/Expert/GetAllExpertsPaginated",
  async (params: any = {}) => {
    const response = await UserManagmentConsume.getAllRoles({
      pageSize: params?.pageSize,
      pageNumber: params?.pageNumber,
    });
    return response;
  }
);
export const fetchDetailsRolesById = createAsyncThunk<
  ResponseModel,
  { id: string; params?: any }
>("role/fetchDetailsRolesById", async ({ id, params }) => {
  const response = await UserManagmentConsume.getDetailsRoleById(id, {
    pageSize: params?.pageSize,
    pageNumber: params?.pageNumber,
  });
  return response;
});

export const AddRoleAsync = createAsyncThunk<string, postRole>(
  "AddRole/AddRoleAsync",
  async (itemData: postRole, thunkAPI) => {
    try {
      const response = await UserManagmentConsume.create(itemData);
      thunkAPI.dispatch(fetchRoles({}) as any);
      // thunkAPI.dispatch(fetchDetailsRolesById({ id: roleId }) as any);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editRoleAsync = createAsyncThunk<string, edittRoleModel>(
  "EditRole/editRoleAsync",
  async (itemData: edittRoleModel, thunkAPI) => {
    try {
      let id = itemData.id;
      const response = await UserManagmentConsume.editRole({body:itemData, id});
      thunkAPI.dispatch(fetchDetailsRolesById({ id: id }) as any);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state: roles) => {
        state.status = "loading";
      })
      .addCase(
        fetchRoles.fulfilled,
        (state: roles, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data.data = action.payload.result as unknown as role[];
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        }
      )
      .addCase(
        fetchRoles.rejected,
        (state: roles, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
    builder
      .addCase(fetchDetailsRolesById.pending, (state: roles) => {
        state.status = "loading";
      })
      .addCase(
        fetchDetailsRolesById.fulfilled,
        (state: roles, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.role = action.payload.result as role;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        }
      )
      .addCase(
        fetchDetailsRolesById.rejected,
        (state: roles, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
          // state.message=action.payload
        }
      );

    builder
      .addCase(AddRoleAsync.pending, (state: roles) => {
        state.status = "loading";
      })
      .addCase(
        AddRoleAsync.fulfilled,
        (state: roles, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        AddRoleAsync.rejected,
        (state: roles, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
          // state.message=action.payload
        }
      );
    builder
      .addCase(editRoleAsync.pending, (state: roles) => {
        state.status = "loading";
      })
      .addCase(
        editRoleAsync.fulfilled,
        (state: roles, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        editRoleAsync.rejected,
        (state: roles, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
          // state.message=action.payload
        }
      );
  },
});

export default rolesSlice.reducer;
export const {} = rolesSlice.actions;

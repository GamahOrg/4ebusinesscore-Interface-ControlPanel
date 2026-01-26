import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import {
  RoleUserModelArray,
  UserRole,
} from "../../models/role-user/role-model-user";
import { fetchDetailsRolesById } from "../role/rolesSlice";
import {
  UsersNotInRoleModel,
  UsersNotInRoleModelArray,
} from "../../models/role-user/users-not-in-role-model";
import { AddUsersToRoleModel } from "../../models/role-user/add-user-to-role-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface roleUser {
  data: RoleUserModelArray;
  status: string;
  message: string;
  messageAddFail: string;
  messageAddSucces: string;
  totalPages: number;
  totalItems: number;
  UserNoInRoles: UsersNotInRoleModelArray;
}
let initialState: roleUser = {
  data: new RoleUserModelArray([], 0, 0),
  status: "idle",
  message: "",
  messageAddFail: "",
  messageAddSucces: "",
  totalPages: 1,
  totalItems: 1,
  UserNoInRoles: new UsersNotInRoleModelArray([], 0, 0),
};

export const fetchUserRoles = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("UserRoles/fetchUserRoles", async ({ id, myparams }) => {
  const response = await UserManagmentConsume.GetUserByRoleId({
    id,
    params: {
      pageSize: myparams?.pageSize,
      pageNumber: myparams?.pageNumber,
      Search: myparams?.Search,
      date: myparams?.date,
    },
  });
  return response;
});

export const fetchUserNoInRoles = createAsyncThunk<ResponseModel, any>(
  "UserNoInRoles/fetchUserNoInRoles",
  async (params, thunkAPI) => {
    try {
      const response = await UserManagmentConsume.GetUsersNoInRole(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeUserRoleAsync = createAsyncThunk<ResponseModel, any>(
  "roleUser/removeUserRole",
  async (data, thunkAPI) => {
    try {
      const response = await UserManagmentConsume.DeleteUserRole(data);
      let id = data.id;

      if (response.statusEnum !== 5) {
        thunkAPI.dispatch(fetchDetailsRolesById({ id }) as any);
        thunkAPI.dispatch(fetchUserRoles({ id }) as any);
      }

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const AddUsersToRole = createAsyncThunk<
  ResponseModel,
  AddUsersToRoleModel
>("data/AddUsersToRole", async (itemData: AddUsersToRoleModel, thunkAPI) => {
  try {
    let roleId = itemData.roleId;
    // itemData.roleId="b8afb036-3e79-4927-e3bc-08dbe0534930";
    const response = await UserManagmentConsume.AddUsersToRole(itemData);
    if (response.statusEnum !== 4) {
      thunkAPI.dispatch(fetchUserRoles({ id: roleId }) as any);
      thunkAPI.dispatch(fetchDetailsRolesById({ id: roleId }) as any);
    }

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const roleUserSlice = createSlice({
  name: "userRoles",
  initialState,
  reducers: {
    restMassge: (state: roleUser) => {
      state.message = "";
      state.messageAddFail = "";
      state.messageAddSucces = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state: roleUser) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserRoles.fulfilled,
        (state: roleUser, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data.data = action.payload.result as unknown as UserRole[];
          state.data.totalItems = action.payload.totalItems;
          state.data.totalPages = action.payload.totalPages;
          //   state.message = action.payload.message
          // state.message=action.payload
        }
      )
      .addCase(
        fetchUserRoles.rejected,
        (state: roleUser, action: PayloadAction<any>) => {
          state.status = "failed";
        }
      );

    builder
      .addCase(fetchUserNoInRoles.pending, (state: roleUser) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserNoInRoles.fulfilled,
        (state: roleUser, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.UserNoInRoles.data = action.payload
            .result as unknown as UsersNotInRoleModel[];
          state.UserNoInRoles.totalItems = action.payload.totalItems;
          state.UserNoInRoles.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchUserNoInRoles.rejected,
        (state: roleUser, action: PayloadAction<any>) => {
          state.status = "failed";
        }
      );
  },
});

export default roleUserSlice.reducer;
export const { restMassge } = roleUserSlice.actions;

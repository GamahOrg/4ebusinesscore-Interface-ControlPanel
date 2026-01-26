import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import {
  RoleGroup,
  RoleGroupModelArray,
} from "../../models/role-group/role-group-model";
import {
  RoleNotGroup,
  RoleNotGroupModelArray,
} from "../../models/role-group/group-not-in-role-mode";
import { AddGroupsToRoleModel } from "../../models/role-group/add-group-to-role-model";
import { DeleteGroupRoleModel } from "../../models/role-group/delete-group-role-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchGroupRoles = createAsyncThunk<
  ResponseModel,
  { id: string; params?: any }
>("GroupRoles/fetchGroupRoles", async ({ id, params }) => {
  const response = await UserManagmentConsume.GetGroupByRoleId(id, {
    pageSize: params?.pageSize,
    pageNumber: params?.pageNumber,
    searchText: params?.searchText,
  });
  return response;
});

export const fetchGroupNotRole = createAsyncThunk<
  ResponseModel,
  { id: string; params?: any }
>("GroupNotRole/fetchGroupNotRole", async ({ id, params }) => {
  const response = await UserManagmentConsume.GetGroupsNoInRole(id, {
    pageSize: params?.pageSize,
    pageNumber: params?.pageNumber,
    search: params?.search,
  });
  return response;
});
export const removeGroupRoleAsync = createAsyncThunk<
  ResponseModel,
  DeleteGroupRoleModel
>(
  "GroupRole/removeGroupRoleAsync",
  async (deleteGroupRoleModel: DeleteGroupRoleModel, thunkAPI) => {
    try {
      // deleteGroupRoleModel.id="7a6fcc87-56df-4741-c066-08dbe05008ed";
      var response =
        await UserManagmentConsume.DeleteGroupRole(deleteGroupRoleModel);
      if (response.statusEnum !== 5) {
        thunkAPI.dispatch(
          fetchGroupRoles({ id: deleteGroupRoleModel.id }) as any
        );
      }

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const AddGroupToRole = createAsyncThunk<
  ResponseModel,
  AddGroupsToRoleModel
>("data/AddUsersToRole", async (itemData: AddGroupsToRoleModel, thunkAPI) => {
  try {
    let roleId = itemData.roleId;

    const response = await UserManagmentConsume.AddGroupsToRole(itemData);
    if (response.statusEnum !== 5) {
      thunkAPI.dispatch(fetchGroupRoles({ id: roleId }) as any);
      // thunkAPI.dispatch(fetchDetailsRolesById({ id: roleId }) as any);
    }
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
interface roleGroup {
  data: RoleGroupModelArray;
  status: string;
  message: string;
  GroupNotInRole: RoleNotGroupModelArray;
}

let initialState: roleGroup = {
  data: new RoleGroupModelArray([], 0, 0),
  status: "idle",
  message: "",
  GroupNotInRole: new RoleNotGroupModelArray([], 0, 0),
};

const roleGroupSlice = createSlice({
  name: "GroupRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupRoles.pending, (state: roleGroup) => {
        state.status = "loading";
      })
      .addCase(
        fetchGroupRoles.fulfilled,
        (state: roleGroup, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data.data = action.payload.result as unknown as RoleGroup[];
          state.data.totalItems = action.payload.totalItems;
          state.data.totalPages = action.payload.totalPages;
          //   state.message = action.payload.message
          // state.message=action.payload
        }
      )
      .addCase(
        fetchGroupRoles.rejected,
        (state: roleGroup, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
          // state.message=action.payload
        }
      );

    builder
      .addCase(fetchGroupNotRole.pending, (state: roleGroup) => {
        state.status = "loading";
      })
      .addCase(
        fetchGroupNotRole.fulfilled,
        (state: roleGroup, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.GroupNotInRole.data = action.payload
            .result as unknown as RoleNotGroup[];
          state.GroupNotInRole.totalItems = action.payload.totalItems;
          state.GroupNotInRole.totalPages = action.payload.totalPages;
          //   state.message = action.payload.message
          // state.message=action.payload
        }
      )
      .addCase(
        fetchGroupNotRole.rejected,
        (state: roleGroup, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
          // state.message=action.payload
        }
      );
    // builder.addCase(removeGroupRoleAsync.fulfilled, (state:roleGroup, action) => {

    //   state.data.data = state.data.data.filter((a) => a.groupId !== action.payload);

    // });
    // builder.addCase(removeGroupRoleAsync.pending, (state) => {
    //   state.status = 'loading';
    // });
    // builder.addCase(removeGroupRoleAsync.rejected, (state, action) => {
    //   state.status = 'failed';

    // });
  },
});

export default roleGroupSlice.reducer;
export const {} = roleGroupSlice.actions;

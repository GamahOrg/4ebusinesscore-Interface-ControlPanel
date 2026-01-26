import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GroupsModel, GroupsModelArray } from "../../models/groups/groups-model";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchGroups = createAsyncThunk<ResponseModel, any>(
  "groups/fetchGroups",
  async (data: any) => {
    const response = await UserManagmentConsume.getAllGroups({
      pageSize: data?.pageSize??10,
      pageNumber: data?.pageNumber??1,
      updatedOn:data.updatedOn,
      groupName:data.groupName,
      createdOn:data.createdOn,
    });
    
    return response;
  }
);

interface groups {
  data: GroupsModelArray;
  status: string;
  message: string;
  totalItems: number;
  totalPages: number;
}
let initialState: groups = {
  data: new GroupsModelArray([], 0, 0),
  status: "idle",
  message: "",
  totalItems: 0,
  totalPages: 0,
};

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {builder
    .addCase(fetchGroups.pending, (state: groups) => {
      state.status = "loading";
    })
    .addCase(
      fetchGroups.fulfilled,
      (state: groups, action: PayloadAction<ResponseModel>) => {
        state.status = "succeeded";
        state.data.data = action.payload.result as unknown as GroupsModel[];
        state.data.totalItems = action.payload.totalItems;
        state.data.totalPages = action.payload.totalPages
      
      }
    )
    .addCase(
      fetchGroups.rejected,
      (state: groups, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message
        
      }
    );
    
  },
});

export default GroupSlice.reducer;

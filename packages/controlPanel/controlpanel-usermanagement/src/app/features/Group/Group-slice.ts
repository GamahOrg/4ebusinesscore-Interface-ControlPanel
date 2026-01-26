import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoleModelArray } from "../../models/role/role-model";
import { ResponseModel } from "../../models/response-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const AddGroup = createAsyncThunk<ResponseModel, any>(
  "AddGroup/FeatchAddGroup",
  async (itemData: any, thunkAPI) => {
    try {
      // let data = FormData(itemData);
      const response = await ControlPanelAggConsume.addGroup(itemData);
      if (response.statusEnum !== 4) {
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const EditGroup = createAsyncThunk<ResponseModel, any>(
  "EditGroup/FeatchEditGroup",
  async (data, thunkAPI) => {
    try {
      // let item = {...data}
      // item.body = FormData(data.body)
      const response = await ControlPanelAggConsume.editGroup(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface groups {
  data: RoleModelArray;
  status: string;
  message: string;
  totalItems: number;
  totalPages: number;
}
let initialState: groups = {
  data: new RoleModelArray([], 0, 0),
  status: "idle",
  message: "",
  totalItems: 0,
  totalPages: 0,
};

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default GroupSlice.reducer;
export const {} = GroupSlice.actions;

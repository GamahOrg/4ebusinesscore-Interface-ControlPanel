import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { ALLusersModel } from "../../models/users/all_users_agg_model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchAllUser = createAsyncThunk<
ResponseModel,
{  params?: any }
>("ALLuser/fetchAllUser", async ({params}, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume?.GetAllUsers(params);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});
interface user {
  data: ALLusersModel[];
  status: string;
  message: string;
  totalItems: number;
  totalPages: number;
}
let initialState: user = {
  data: [],
  status: "idle",
  message: "",
  totalItems: 0,
  totalPages: 0,
};

const AlluserSlice = createSlice({
  name: "ALLuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state: user) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllUser.fulfilled,
        (state: user, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as ALLusersModel[];
          state.totalItems=action.payload.pageSize;
          state.totalPages=action.payload.pageIndex;
        }
      )
      .addCase(
        fetchAllUser.rejected,
        (state: user, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default AlluserSlice.reducer;

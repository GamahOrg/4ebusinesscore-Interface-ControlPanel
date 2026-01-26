import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { ManagerModel } from "../../models/manager-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchOrgManagers = createAsyncThunk<ResponseModel, any>(
  "orgs/fetchorgMangers",
  async (id: string, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getAllManagers(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
interface OrgMangersState {
  data: ManagerModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string;
}
let initialState: OrgMangersState = {
  data: [],
  status: "idle",
  message: "",
};
export const allOrgMangersSlice = createSlice({
  name: "org-managers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchOrgManagers.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as ManagerModel[];
        },
      )
      .addCase(fetchOrgManagers.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        fetchOrgManagers.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        },
      );
  },
});

export default allOrgMangersSlice.reducer;

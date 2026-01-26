
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { ManagerModel } from "../../models/manager-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchOrgManager = createAsyncThunk<ResponseModel, any>(
  "orgs/fetchorgManager",
  async (id: string) => {

    const response = await ControlPanelAggConsume.getOrgManagerbyId(id);
    return response;
  });
interface OrgManagerState {
  data: ManagerModel | null;
  status: string;
  message: string;
}
let initialState: OrgManagerState = {
  data: null,
  status: "idle",
  message: "",
};
export const orgManagerSlice = createSlice({
  name: 'org-manager',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgManager.pending, (state: OrgManagerState) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgManager.fulfilled,
        (state: OrgManagerState, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as ManagerModel;

        }
      )
      .addCase(
        fetchOrgManager.rejected,
        (state: OrgManagerState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;

        }
      );
  },
})


export default orgManagerSlice.reducer
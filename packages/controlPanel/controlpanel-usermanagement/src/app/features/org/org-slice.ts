import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { MemberModel } from "../../models/org-Agg/MemberModel";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchOrgMembers = createAsyncThunk<
  ResponseModel,
  { id: string; params?: any }
>("orgs/fetchorgMembers", async ({ id, params }) => {
  // const response = await OrggAggregatorApiConsume.getALLMemberForOrg(id, {
    const response = await ControlPanelAggConsume.getAllOrgMembers({id,
    params: {
      pageSize: params?.pageSize,
      pageNumber: params?.pageNumber,
      date: params?.date,
    },
  });
  return response;
});
interface OrgMemberrState {
  data: MemberModel[];
  status: string;
  message: string;
}
let initialState: OrgMemberrState = {
  data: [],
  status: "idle",
  message: "",
};
const orgAggSlice = createSlice({
  name: "orgAgg",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgMembers.pending, (state: OrgMemberrState) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgMembers.fulfilled,
        (state: OrgMemberrState, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as MemberModel[];
        }
      )
      .addCase(
        fetchOrgMembers.rejected,
        (state: OrgMemberrState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
          // state.message=action.payload
        }
      );
  },
});

export default orgAggSlice.reducer;

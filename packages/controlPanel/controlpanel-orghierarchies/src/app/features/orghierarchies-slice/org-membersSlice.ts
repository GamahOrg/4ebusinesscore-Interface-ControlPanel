
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { MemberModel } from "../../models/member-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";



  export const fetchOrgMembers = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("orgs/fetchorgMembers", async ({ id, myparams }) => {
  const response = await ControlPanelAggConsume.getAllOrgMembers({
    id,
    params: {
      pageSize: myparams?.pageSize,
      pageNumber: myparams?.pageNumber,
      search: myparams?.search,
      date: myparams?.date,
    },
  });
  return response;
});

interface OrgMemberrState {
  data: MemberModel[];
  status: string;
  message: string;
  orgHasMembers:any[];
}
let initialState: OrgMemberrState = {
  data: [],
  status: "idle",
  message: "",
  orgHasMembers:[]
};
export const orgMemberSlice = createSlice({
  name: 'org-members',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgMembers.pending, (state: OrgMemberrState) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgMembers.fulfilled,
        (state: OrgMemberrState, action: any) => {
          state.status = "succeeded";
          if (action.payload.result && action?.payload?.result?.length > 0) {
            const orgId = action?.payload?.result[0].orgId;
            if (!state.orgHasMembers.includes(orgId)) {
              state.orgHasMembers.push(orgId);
            }
          }
          state.data = action?.payload?.result as MemberModel[];
        }
      )
      .addCase(
        fetchOrgMembers.rejected,
        (state: OrgMemberrState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
         
        }
      );
  },
})

// Action creators are generated for each case reducer function

export default orgMemberSlice.reducer
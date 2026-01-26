import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { PostHierarchyMembersModel } from "../../models/post-hierarchy-members-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const postOrgMembersAsync = createAsyncThunk<
  ResponseModel,
  PostHierarchyMembersModel
>("org/postMembers", async (data: PostHierarchyMembersModel) => {
  const response = await ControlPanelAggConsume.postOrgMembers(data);
  return response;
});

interface OrgMembersState {
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrgMembersState = {
  message: "",
  status: "idle",
  error: null,
};

const PostOrgMembersSlice = createSlice({
  name: "postOrgMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrgMembersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrgMembersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(postOrgMembersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default PostOrgMembersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { PostHierarchyManagersModel } from "../../models/post-hierarchy-managers-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const postOrgManagerAsync = createAsyncThunk<ResponseModel, PostHierarchyManagersModel>(
  "org/postManager", async (data: PostHierarchyManagersModel) => {
    const response = await ControlPanelAggConsume.postOrgManager(data);
    return response;
  });

interface OrgMangerState {
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrgMangerState = {
  message: "",
  status: "idle",
  error: null,
};

const PostOrgManagerSlice = createSlice({
  name: "putOrgManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrgManagerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrgManagerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message

      })
      .addCase(postOrgManagerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default PostOrgManagerSlice.reducer;

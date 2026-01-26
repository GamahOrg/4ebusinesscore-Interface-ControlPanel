import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { DeleteOrgMember } from "../../models/delete-org-member-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";
import { DeleteOrgManager } from "../../models/delete-org-manager-model";

export const deleteOrgMemberAsync = createAsyncThunk<
  ResponseModel,
  DeleteOrgMember
>("org/deleteOrgMember", async (model: DeleteOrgMember) => {
  const response = await OrgConsume.deleteMember(model);
  return response;
});

export const deleteOrgManager = createAsyncThunk<
  ResponseModel,
  DeleteOrgManager
>("org/deleteOrgMember", async (model: DeleteOrgManager) => {
  const response = await OrgConsume.deleteManager(model);
  return response;
});

interface OrgMemberState {
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrgMemberState = {
  message: "",
  status: "idle",
  error: null,
};

const deleteOrgMemeberSlice = createSlice({
  name: "deleteOrgMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrgMemberAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrgMemberAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(deleteOrgMemberAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteOrgManager.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrgManager.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(deleteOrgManager.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default deleteOrgMemeberSlice.reducer;

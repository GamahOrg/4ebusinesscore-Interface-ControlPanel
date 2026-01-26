import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { OrgHierarchyModel } from "../../models/org-model";
import { DeleteOrgModel } from "../../models/consume-org-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";

export const deleteOrgAsync = createAsyncThunk<ResponseModel, DeleteOrgModel>(
  "org/deleteOrg",
  async (model: DeleteOrgModel) => {
    const response = await OrgConsume.delete(model.id, { removeReason: model.removeReason })
    return response;
  }
);

interface OrgState {
  items: OrgHierarchyModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrgState = {
  items: [],
  status: "idle",
  error: null,
};

const deleteOrSlice = createSlice({
  name: "deleteOrg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrgAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrgAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        
      })
      .addCase(deleteOrgAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default deleteOrSlice.reducer;

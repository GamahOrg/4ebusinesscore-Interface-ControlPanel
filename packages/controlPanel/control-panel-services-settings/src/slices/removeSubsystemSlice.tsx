import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { SubsystemModel } from "../models/subsystemsModel";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";

export const deleteSubSystems = createAsyncThunk<ResponseModel, any>(
  "workspace/deleteSubSystems",
  async (id: string) => {
    const response = await WorkspaceConsume.deleteSubsystems(id);
    return response;
  }
);

interface SubsystemState {
  items: SubsystemModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const removeSubsystemSlice = createSlice({
  name: "deleteSubsystem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubSystems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSubSystems.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedItemId = action.meta.requestId;
        state.items = state.items.filter((item) => item.id !== deletedItemId);

        // const deletedId = action.meta.requestId;

        // state.items = state.items.map((item) =>
        //   item.id === deletedId ? { ...item, is_enabled: false } : item
        // );
      })
      .addCase(deleteSubSystems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default removeSubsystemSlice.reducer;

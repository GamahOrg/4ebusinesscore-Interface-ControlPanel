import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const getWorkSpaceComponentById = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("UserRoles/fetchUserRoles", async ({ id, myparams }) => {
  const response = await ControlPanelAggConsume.getWorkSpaceComponent({id,params: {
    pageSize: myparams?.pageSize,
    pageNumber: myparams?.pageNumber,
    searchTerm: myparams?.searchTerm
  }});
  return response;
});


interface SubsystemState {
  items: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
  totalItems: number;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
  totalPages: 1,
  totalItems: 1,
};

const WorkSpaceComponentSlice = createSlice({
  name: "getworkspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkSpaceComponentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWorkSpaceComponentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as [] 
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getWorkSpaceComponentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default WorkSpaceComponentSlice.reducer;

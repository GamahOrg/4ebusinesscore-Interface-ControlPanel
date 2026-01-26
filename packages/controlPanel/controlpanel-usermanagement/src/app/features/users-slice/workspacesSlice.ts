import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { WorkspaceModel } from "../../models/users/workspaces";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchWorkspace = createAsyncThunk<ResponseModel, any>(
  "workspace/fetchWorkspace",
  async (data: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume?.getAllWorkspaces(data?.id,{
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface Workspaces {
  data: WorkspaceModel[];
  totalPages: number;
  totalItems: number;
  status: string;
  message: string;
}
let initialState: Workspaces = {
  data: [],
  totalPages: 1,
  totalItems: 1,
  status: "idle",
  message: "",
};

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspace.pending, (state: Workspaces) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkspace.fulfilled,
        (state: Workspaces, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as WorkspaceModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchWorkspace.rejected,
        (state: Workspaces, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        }
      );
  },
});

export default workspacesSlice.reducer;

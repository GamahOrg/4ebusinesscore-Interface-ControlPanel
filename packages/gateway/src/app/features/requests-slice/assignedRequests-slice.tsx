import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { IncomingRequests } from "../../models/requests/incoming-requests";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";

export const fetchAssignedRequests = createAsyncThunk<ResponseModel, any>(
  "assignedRequests/fetchAssignedRequests",
  async (data: any, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getIncomingFilterAssginRequsets(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface requests {
  data: IncomingRequests[];
  status: string;
  totalPages: number;
  message: string;
}

let initialState: requests = {
  data: [],
  status: "idle",
  totalPages: 0,
  message: "",
};

const assignedRequestsSlice = createSlice({
  name: "assignedRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedRequests.pending, (state: requests) => {
        state.status = "loading";
      })
      .addCase(
        fetchAssignedRequests.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as IncomingRequests[];
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchAssignedRequests.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default assignedRequestsSlice.reducer;

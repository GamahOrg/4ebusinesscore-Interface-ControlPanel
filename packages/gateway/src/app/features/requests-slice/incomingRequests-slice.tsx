import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { IncomingRequests } from "../../models/requests/incoming-requests";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";


export const fetchIncomingRequests = createAsyncThunk<ResponseModel, any>(
  "IncomingRequests/fetchIncomingRequests",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getIncomingRequests(
        {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const fetchIncomingRequestsWithFilter = createAsyncThunk<ResponseModel, any>(
  "IncomingRequests/fetchIncomingRequestsWithFilter",
  async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if(Object.keys(data?.body)?.length>0){
      if (data?.body?.orgIds[0] != null) {
        for (
          let index = 0;
          index <  data?.body?.orgIds?.length;
          index++
        ) {
          bodyFormData.append(
            "orgIds",
            data?.body?.orgIds[index]
          );
        }
      }
      if (data?.body?.requester[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.requester?.length;
            index++
          ) {
            bodyFormData.append(
              "requester",
              data?.body?.requester[index]
            );
          }
        }
      if (data?.body?.requestInstanceName[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.requestInstanceName?.length;
            index++
          ) {
            bodyFormData.append(
              "requestInstanceName",
              data?.body?.requestInstanceName[index]
            );
          }
        }
      if (data?.body?.categoryIds[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.categoryIds?.length;
            index++
          ) {
            bodyFormData.append(
              "categoryIds",
              data?.body?.categoryIds[index]
            );
          }
        }
      if (data?.body?.requestInstanceNumber[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.requestInstanceNumber?.length;
            index++
          ) {
            bodyFormData.append(
              "requestInstanceNumber",
              data?.body?.requestInstanceNumber[index]
            );
          }
        }
      if (data?.body?.statues[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.statues?.length;
            index++
          ) {
            bodyFormData.append(
              "statues",
            data?.body?.statues[index]
            );
          }
        }
      if (data?.body?.dateTimes[0] != null) {
          for (
            let index = 0;
            index <  data?.body?.dateTimes?.length;
            index++
          ) {
            bodyFormData.append(
              "dateTimes",
              data?.body?.dateTimes[index].split("T")[0]
            );
          }
        }
    }
    try {
      const response = await DynamicWorkflowAggConsume.getIncomingRequestsWithFilter({params:data.params,body:bodyFormData});
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface incomingRequests {
  data: IncomingRequests[];
  status: string;
  totalPages: number;
  message: string;
}

let initialState: incomingRequests = {
  data: [],
  status: "idle",
  totalPages: 0,
  message: "",
};

const incomingRequestsSlice = createSlice({
  name: "IncomingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomingRequests.pending, (state: incomingRequests) => {
        state.status = "loading";
      })
      .addCase(
        fetchIncomingRequests.fulfilled,
        (state: incomingRequests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as IncomingRequests[];
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchIncomingRequests.rejected,
        (state: incomingRequests, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default incomingRequestsSlice.reducer;

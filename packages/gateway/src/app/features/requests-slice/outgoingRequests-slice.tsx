import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { Requests } from "../../models/requests/requests";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";


// export const fetchOutgoingRequests = sliceAction(()=>DynamicWorkflowAggConsume.getOutgoingRequests())

export const fetchOutgoingRequests = createAsyncThunk<ResponseModel, any>(
  "outgoingRequests/fetchOutgoingRequests",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getOutgoingRequests(
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

export const fetchOutgoingRequestsWithFilter = createAsyncThunk<ResponseModel, any>(
  "outgoingRequests/fetchOutgoingRequestsWithFilter",
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
                data?.body?.dateTimes[index]?.split("T")[0]
              );
            }
          }
      }
    try {
      const response = await DynamicWorkflowAggConsume.getOutgoingRequestsWithFilter({params:data.params,body:bodyFormData});
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface outgoingRequests {
  data: Requests[];
  status: string;
  totalPages: number;
  message: string;
  totalItems:number;
}

let initialState:outgoingRequests = {
  data: [],
  status: "idle",
  totalPages: 0,
  message: "",
  totalItems:0
};

const outgoingRequestsSlice = createSlice({
  name: "outgoingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutgoingRequests.pending, (state: outgoingRequests) => {
        state.status = "loading";
      })
      .addCase(
        fetchOutgoingRequests.fulfilled,
        (state: outgoingRequests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as Requests[];
          state.totalItems = action.payload.totalItems as number;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchOutgoingRequests.rejected,
        (state: outgoingRequests, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default outgoingRequestsSlice.reducer;

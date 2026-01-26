import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { IncomingRequests } from "../../models/requests/incoming-requests";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { Requests } from "../../models/requests/requests";

export const fetchIncomingRequestsWithFilter = createAsyncThunk<ResponseModel, any>(
  "requestsForProfile/fetchIncomingRequestsWithFilter",
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
export const fetchArchivedRequestsWithFilter = createAsyncThunk<
  ResponseModel,
  any
>(
  "archivedRequests/fetchArchivedRequestsWithFilter",
  async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if (Object.keys(data?.body)?.length > 0) {
      if (data?.body?.orgIds[0] != null) {
        for (let index = 0; index < data?.body?.orgIds?.length; index++) {
          bodyFormData.append("orgIds", data?.body?.orgIds[index]);
        }
      }
      if (data?.body?.requester[0] != null) {
        for (let index = 0; index < data?.body?.requester?.length; index++) {
          bodyFormData.append("requester", data?.body?.requester[index]);
        }
      }
      if (data?.body?.requestInstanceName[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceName?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceName",
            data?.body?.requestInstanceName[index]
          );
        }
      }
      if (data?.body?.categoryIds[0] != null) {
        for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
          bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
        }
      }
      if (data?.body?.requestInstanceNumber[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceNumber?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceNumber",
            data?.body?.requestInstanceNumber[index]
          );
        }
      }
      if (data?.body?.statues[0] != null) {
        for (let index = 0; index < data?.body?.statues?.length; index++) {
          bodyFormData.append("statues", data?.body?.statues[index]);
        }
      }
      if (data?.body?.dateTimes[0] != null) {
        for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
          bodyFormData.append(
            "dateTimes",
            data?.body?.dateTimes[index].split("T")[0]
          );
        }
      }
      if (data?.body?.delegatedUsers[0] != null) {
        for (
          let index = 0;
          index < data?.body?.delegatedUsers?.length;
          index++
        ) {
          bodyFormData.append(
            "delegatedUsers",
            data?.body?.delegatedUsers[index]
          );
        }
      }
    }
    try {
      const response =
        await DynamicWorkflowAggConsume.getAllFliterRequestInstancesTharUserTakeAction({
          params: data.params,
          body: bodyFormData,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchOutgoingRequestsWithFilter = createAsyncThunk<ResponseModel, any>(
    "requestsForProfile/fetchOutgoingRequestsWithFilter",
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
export const fetchIncomingFilterAssginRequsets = createAsyncThunk<ResponseModel, any>(
    "requestsForProfile/fetchIncomingFilterAssginRequsets",
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
        const response = await DynamicWorkflowAggConsume.getIncomingFilterAssginRequsets({params:data.params,body:bodyFormData});
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err?.message);
      }
    }
  );

  export const fetchSuggestedRequestsWithFilter = createAsyncThunk<
    ResponseModel,
    any
  >("requests/fetchSuggestedRequestsWithFilter", async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if (Object.keys(data?.body)?.length > 0) {
      if (data?.body?.orgIds[0] != null) {
        for (let index = 0; index < data?.body?.orgIds?.length; index++) {
          bodyFormData.append("orgIds", data?.body?.orgIds[index]);
        }
      }
  
      if (data?.body?.mainClassificationsIds) {
        bodyFormData.append("mainClassificationsIds", data?.body?.mainClassificationsIds);
      }
      if (data?.body?.serviceCatalogsIds) {
        bodyFormData.append("serviceCatalogsIds", data?.body?.serviceCatalogsIds);
      }
      if (data?.body?.serviceManagementCategoryIds) {
        bodyFormData.append("serviceManagementCategoryIds", data?.body?.serviceManagementCategoryIds);
      }
      if (data?.body?.itemIds) {
        bodyFormData.append("itemIds", data?.body?.itemIds);
      }
  
      if (data?.body?.requestInstanceName[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceName?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceName",
            data?.body?.requestInstanceName[index]
          );
        }
      }
      if (data?.body?.categoryIds[0] != null) {
        for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
          bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
        }
      }
      if (data?.body?.requestInstanceNumber[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceNumber?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceNumber",
            data?.body?.requestInstanceNumber[index]
          );
        }
      }
      if (data?.body?.statues[0] != null) {
        for (let index = 0; index < data?.body?.statues?.length; index++) {
          bodyFormData.append("statues", data?.body?.statues[index]);
        }
      }
      if (data?.body?.delegatedUsers[0] != null) {
        for (let index = 0; index < data?.body?.delegatedUsers?.length; index++) {
          bodyFormData.append(
            "delegatedUsers",
            data?.body?.delegatedUsers[index]
          );
        }
      }
      if (data?.body?.dateTimes[0] != null) {
        for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
          bodyFormData.append(
            "dateTimes",
            data?.body?.dateTimes[index]?.split("T")[0]
          );
        }
      }
    }
    try {
      const response =
        await DynamicWorkflowAggConsume.getSuggestedRequestsWithFilter({
          params: data.params,
          body: bodyFormData,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  });
interface requests {
  incomingRequests: IncomingRequests[];
  outgoingRequests:Requests[];
  assignRequests:IncomingRequests[];
  archivedRequests: IncomingRequests[];
  statusForIncoming: string;
  totalPagesForIncoming: number;
  totalItemsForIncoming: number;
  messageForIncoming: string;
  pageSizeForIncoming:number;
  pageIndexForIncoming:number;
  statusForAssign: string;
  totalPagesForAssign: number;
  totalItemsForAssign: number;
  messageForAssign: string;
  pageSizeForAssign:number;
  pageIndexForAssign:number;
  statusForOutgoing: string;
  totalPagesForOutgoing: number;
  totalItemsForOutgoing: number;
  messageForOutgoing: string;
  pageSizeForOutgoing:number;
  pageIndexForOutgoing:number;
  statusForArchive: string;
  totalPagesForArchive: number;
  totalItemsForArchive: number;
  messageForArchive: string;
  pageSizeForArchive:number;
  pageIndexForArchive:number;
  suggestedRequests: Requests[];
  messageForSuggested: string;
  statusForSuggested: string;
  totalPagesForSuggested: number;
  totalItemsForSuggested: number;
  pageSizeForSuggested: number;
  pageIndexForSuggested: number;
  
}

let initialState: requests = {
  incomingRequests: [],
  outgoingRequests:[],  
  assignRequests:[],
  archivedRequests: [],
  statusForIncoming: "idle",
  totalPagesForIncoming: 0,
  totalItemsForIncoming:0,
  messageForIncoming: "",
  pageSizeForIncoming:0,
  pageIndexForIncoming:0,
  statusForAssign: "idle",
  totalPagesForAssign: 0,
  totalItemsForAssign:0,
  messageForAssign: "",
  pageSizeForAssign:0,
  pageIndexForAssign:0,
  statusForOutgoing: "idle",
  totalPagesForOutgoing: 0,
  totalItemsForOutgoing:0,
  messageForOutgoing: "",
  pageSizeForOutgoing:0,
  pageIndexForOutgoing:0,
  statusForArchive: "idle",
  totalPagesForArchive: 0,
  totalItemsForArchive:0,
  messageForArchive: "",
  pageSizeForArchive:0,
  pageIndexForArchive:0,
  suggestedRequests: [],
  messageForSuggested: "",
  statusForSuggested: "idle",
  totalPagesForSuggested: 0,
  totalItemsForSuggested: 0,
  pageSizeForSuggested: 0,
  pageIndexForSuggested: 0
};

const requestsSlice = createSlice({
  name: "requestsForProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIncomingRequestsWithFilter.pending, (state: requests) => {
        state.statusForIncoming = "loading";
      }).addCase(
        fetchIncomingRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForIncoming = "succeeded";
          state.incomingRequests = action.payload.result as unknown as IncomingRequests[];
          state.totalPagesForIncoming = action.payload.totalPages;
          state.totalItemsForIncoming = action.payload.totalItems;
          state.pageIndexForIncoming = action.payload.pageIndex;
          state.pageSizeForIncoming = action.payload.pageSize;
        }
      ).addCase(
        fetchIncomingRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForIncoming = "failed";
          state.messageForIncoming = action.payload;
        }
      ).addCase(fetchOutgoingRequestsWithFilter.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchOutgoingRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForOutgoing = "succeeded";
          state.outgoingRequests = action.payload.result as unknown as Requests[];
          state.totalPagesForOutgoing = action.payload.totalPages;
          state.totalItemsForOutgoing = action.payload.totalItems;
          state.pageIndexForOutgoing = action.payload.pageIndex;
          state.pageSizeForOutgoing = action.payload.pageSize;
        }
      )
      .addCase(
        fetchOutgoingRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForOutgoing = "failed";
          state.messageForOutgoing = action.payload;
        }
      ).addCase(fetchIncomingFilterAssginRequsets.pending, (state: requests) => {
        state.statusForAssign = "loading";
      })
      .addCase(
        fetchIncomingFilterAssginRequsets.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForAssign = "succeeded";
          state.assignRequests = action.payload.result as unknown as IncomingRequests[];
          state.totalPagesForAssign = action.payload.totalPages;
          state.totalItemsForAssign = action.payload.totalItems;
          state.pageIndexForAssign= action.payload.pageIndex;
          state.pageSizeForAssign= action.payload.pageSize;
        }
      )
      .addCase(
        fetchIncomingFilterAssginRequsets.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForAssign = "failed";
          state.messageForAssign = action.payload;
        }
      ).addCase(fetchArchivedRequestsWithFilter.pending, (state: requests) => {
        state.statusForArchive = "loading";
      })
      .addCase(
        fetchArchivedRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForArchive = "succeeded";
          state.archivedRequests = action.payload.result as unknown as IncomingRequests[];
          state.totalPagesForArchive = action.payload.totalPages;
          state.totalItemsForArchive = action.payload.totalItems;
          state.pageIndexForArchive= action.payload.pageIndex;
          state.pageSizeForArchive= action.payload.pageSize;
        }
      )
      .addCase(
        fetchArchivedRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForArchive = "failed";
          state.messageForArchive = action.payload;
        }
      ) 
       .addCase(fetchSuggestedRequestsWithFilter.pending, (state: requests) => {
              state.statusForSuggested = "loading";
            })
            .addCase(
              fetchSuggestedRequestsWithFilter.fulfilled,
              (state: requests, action: PayloadAction<ResponseModel>) => {
                state.statusForSuggested = "succeeded";
                state.suggestedRequests = action.payload
                  .result as unknown as Requests[];
                state.totalPagesForSuggested = action.payload.totalPages;
                state.totalItemsForSuggested = action.payload.totalItems;
                state.pageIndexForSuggested = action.payload.pageIndex;
                state.pageSizeForSuggested = action.payload.pageSize;
              }
            )
            .addCase(
              fetchSuggestedRequestsWithFilter.rejected,
              (state: requests, action: PayloadAction<any>) => {
                state.statusForSuggested = "failed";
                state.messageForSuggested = action.payload;
              }
            )
       ;
  },
});

export default requestsSlice.reducer;

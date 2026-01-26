import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import {
  DomainsModel,
} from "../../models/domain/domain-model";
import { ResponseModel } from "../../models/response-model";

export const fetchDomains = createAsyncThunk<ResponseModel, any>(
  "domains/fetchDomains",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllDomains({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        domainName: data?.domainName,
        updatedOn: data?.updatedOn,
        userName: data?.userName,
        isActive: data.isActive,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface domains {
  data: DomainsModel[];
  status: string;
  totalPages:number;
  totalItems:number;
  message: string;
}

let initialState: domains = {
  data: [],
  status: "idle",
  totalPages:1,
  totalItems:1,
  message: "",
};

const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state: domains) => {
        state.status = "loading";
      })
      .addCase(
        fetchDomains.fulfilled,
        (state: domains, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as DomainsModel[];
          state.totalPages=action.payload.totalPages
          state.totalItems=action.payload.totalItems
        }
      )
      .addCase(
        fetchDomains.rejected,
        (state: domains, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default domainsSlice.reducer;

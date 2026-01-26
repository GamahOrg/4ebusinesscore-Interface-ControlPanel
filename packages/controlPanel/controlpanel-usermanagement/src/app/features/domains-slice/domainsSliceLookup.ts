import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { DomainsModel } from "../../models/domain/domain-model";
import { ResponseModel } from "../../models/response-model";

export const fetchDomainsLookup = createAsyncThunk<ResponseModel, any>(
  "domains/fetchDomainsLookup",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllDomains({
        pageSize: 10000,
        pageNumber: 1,
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
  totalPages: number;
  message: string;
}

let initialState: domains = {
  data: [],
  status: "idle",
  totalPages: 0,
  message: "",
};

const domainsLookupSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomainsLookup.pending, (state: domains) => {
        state.status = "loading";
      })
      .addCase(
        fetchDomainsLookup.fulfilled,
        (state: domains, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as DomainsModel[];
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchDomainsLookup.rejected,
        (state: domains, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default domainsLookupSlice.reducer;

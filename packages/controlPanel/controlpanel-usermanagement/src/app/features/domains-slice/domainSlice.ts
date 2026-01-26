import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import {
  DomainsModel,
} from "../../models/domain/domain-model";
import { ResponseModel } from "../../models/response-model";

export const fetchDomain = createAsyncThunk<ResponseModel, number | string | Number>(
  "domain/fetchDomain",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getDomainbyId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface domain {
  data: DomainsModel;
  status: string;
  message: string;
}
let initialState: domain = {
  data: new DomainsModel("", new Date(), new Date(), "", "", "", "", false),
  status: "idle",
  message: "",
};

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomain.pending, (state: domain) => {
        state.status = "loading";
      })
      .addCase(
        fetchDomain.fulfilled,
        (state: domain, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as DomainsModel;
        }
      )
      .addCase(
        fetchDomain.rejected,
        (state: domain, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default domainSlice.reducer;

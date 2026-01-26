import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { JobNameModel } from "../../models/job-name/job-name";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchJobNames = createAsyncThunk<ResponseModel, any>(
  "jobNames/fetchJobNames",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllJobNames({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface jobNames {
  data: JobNameModel[];
  status: string;
  message: string;
}
let initialState: jobNames = {
  data: [],
  status: "idle",
  message: "",
};

const jobNamesSlice = createSlice({
  name: "jobNames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobNames.pending, (state: jobNames) => {
        state.status = "loading";
      })
      .addCase(fetchJobNames.fulfilled, (state: jobNames, action: PayloadAction<ResponseModel>) => {
        state.status = "succeeded";
        state.data = action.payload.result as unknown as JobNameModel[];
      })
      .addCase(fetchJobNames.rejected, (state: jobNames, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
      });
  },
});

export default jobNamesSlice.reducer;

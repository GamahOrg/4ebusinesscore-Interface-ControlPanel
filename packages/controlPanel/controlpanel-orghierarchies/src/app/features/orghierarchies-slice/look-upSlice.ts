import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { LookUpModel } from "../../models/look-up-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";
import { Pagination } from "@4eplatform/shared/models/Pagination";

interface LookUpState {
  lookup: LookUpModel;
  lookups: LookUpModel[];
  status: RequestStatus;
  error: string | null;
  pagination: Pagination;
  allLookUps: LookUpModel[];
}
interface Params {
  PageNumber: number;
  PageSize: number;
}
const initialState: LookUpState = {
  lookup: new LookUpModel(),
  lookups: [],
  status: RequestStatus.idle,
  error: "",
  pagination: new Pagination(),
  allLookUps: [],
};
export const addLookUp = createAsyncThunk<ResponseModel, any>(
  "lookups/addLookUp",
  async (data, thunkApi) => {
    try {
      const response = await OrgConsume.postLookUp(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getLookUps = createAsyncThunk<ResponseModel, Params>(
  "lookups/getLookUps",
  async (params: Params, thunkAPI) => {
    try {
      const response = await OrgConsume.getAllOrgCategory(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Failed to fetch lookups" });
    }
  }
);
export const getAllLookUps = createAsyncThunk(
  "lookups/getAllLookUps",
  async () => {
    const response = await OrgConsume.getAllOrgCategory({
      PageNumber: 1,
      PageSize: 1000,
    });
    return response; // Assuming the result contains all lookups
  }
);

export const deleteLookUpById = createAsyncThunk<ResponseModel, any>(
  "lookups/deleteLookUpById",
  async (id, thunkApi) => {
    try {
      const response = await OrgConsume.deleteLookUp(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editLookUpById = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("lookups/editLookUpById", async (params, thunkApi) => {
  try {
    const response = await OrgConsume.putLookUp(params);
    return response;
  } catch (err: any) {
    console.error("Error in PutOperationReportStatusSolved:", err);
    return thunkApi.rejectWithValue(err);
  }
});

const LookupSlice = createSlice({
  name: "lookups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLookUp.pending, handlePending)
      .addCase(addLookUp.fulfilled, handleFulfilled)
      .addCase(addLookUp.rejected, handleRejected)
      .addCase(getLookUps.pending, handlePending)
      .addCase(getLookUps.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        if (action.payload && action.payload.result) {
          state.lookups = action.payload.result as LookUpModel[];
          state.pagination = action.payload as ResponseModel;
        } else {
          state.error = "Invalid response format";
        }
      })
      .addCase(getLookUps.rejected, handleRejected)
      .addCase(deleteLookUpById.pending, handlePending)
      .addCase(deleteLookUpById.fulfilled, handleFulfilled)
      .addCase(deleteLookUpById.rejected, handleRejected)
      .addCase(editLookUpById.pending, handlePending)
      .addCase(editLookUpById.fulfilled, handleFulfilled)
      .addCase(editLookUpById.rejected, handleRejected)
      .addCase(getAllLookUps.fulfilled, (state, action) => {
        state.allLookUps = action.payload.result as LookUpModel[];
      });
  },
});

const handlePending = (state: LookUpState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: LookUpState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: LookUpState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default LookupSlice.reducer;

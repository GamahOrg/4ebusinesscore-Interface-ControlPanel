import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UsersModel } from "../../models/users/users";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const postUserDelegation = createAsyncThunk<ResponseModel, any>(
  "delegation/postDelegation",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.postUserDelegationFromAdmin({
        delegeatedToUserId: data?.delegeatedToUserId,
        delegeatedFromUserId: data?.delegeatedFromUserId,
        startDate: data?.startDate,
        endDate: data?.endDate,
        isActive: data?.isActive,
        isApprovedFrom: data?.isApprovedFrom,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateUserDelegation = createAsyncThunk<ResponseModel, any>(
  "delegation/updateUserDelegation",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.updateUserDelegationFromAdmin(
        {
          id: data?.id,
          delegeatedToUserId: data?.delegeatedToUserId,
          delegeatedFromUserId: data?.delegeatedFromUserId,
          startDate: data?.startDate,
          endDate: data?.endDate,
          isActive: data?.isActive,
          isApprovedFrom: data?.isApprovedFrom,
        }
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getAllDelegationFromUserByUserId = createAsyncThunk<
  ResponseModel,
  any
>(
  "delegation/getAllDelegationFromUserByUserId",
  async ({ id, myParams }, thunkApi) => {
    try {
      const response =
        await UserManagmentConsume.getAllDelegationFromUserByUserId({
          id,
          params: {
            pageSize: myParams?.pageSize,
            pageNumber: myParams?.pageNumber,
          },
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const getAllDelegationToUserByUserId = createAsyncThunk<
  ResponseModel,
  any
>(
  "delegation/getAllDelegationToUserByUserId",
  async ({ id, myParams }, thunkApi) => {
    try {
      const response =
        await UserManagmentConsume.getAllDelegationToUserByUserId({
          id,
          params: {
            pageSize: myParams?.pageSize,
            pageNumber: myParams?.pageNumber,
          },
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface userDelegation {
  data: UsersModel[];
  fromDelegations: any;
  toDelegations: any;
  totalPages: number;
  totalItems: number;
  totalIncomingDelegationPages: number;
  totalIncomingDelegationItems: number;
  totalOutgoingDelegationPages: number;
  totalOutgoingDelegationItems: number;
  status: string;
  message: string;
}
let initialState: userDelegation = {
  data: [],
  fromDelegations: [],
  toDelegations: [],
  totalPages: 1,
  totalItems: 1,
  totalIncomingDelegationPages: 1,
  totalIncomingDelegationItems: 1,
  totalOutgoingDelegationPages: 1,
  totalOutgoingDelegationItems: 1,
  status: "idle",
  message: "",
};

const delegationSlice = createSlice({
  name: "delegation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        postUserDelegation.pending,
        (state: userDelegation, action: any) => {
          state.status = "loading";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        postUserDelegation.fulfilled,
        (state: userDelegation, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as any;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        postUserDelegation.rejected,
        (state: userDelegation, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        updateUserDelegation.pending,
        (state: userDelegation, action: any) => {
          state.status = "loading";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        updateUserDelegation.fulfilled,
        (state: userDelegation, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as any;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        updateUserDelegation.rejected,
        (state: userDelegation, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationToUserByUserId.pending,
        (state: userDelegation, action: any) => {
          state.status = "loading";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationToUserByUserId.fulfilled,
        (state: userDelegation, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.toDelegations = action.payload.result as any;
          state.totalIncomingDelegationPages = action.payload.totalPages;
          state.totalIncomingDelegationItems = action.payload.totalItems;
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationToUserByUserId.rejected,
        (state: userDelegation, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.pending,
        (state: userDelegation, action: any) => {
          state.status = "loading";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.fulfilled,
        (state: userDelegation, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.fromDelegations = action.payload.result as any;
          state.totalOutgoingDelegationPages = action.payload.totalPages;
          state.totalOutgoingDelegationItems = action.payload.totalItems;
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.rejected,
        (state: userDelegation, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action?.payload?.message;
        }
      );
  },
});

export default delegationSlice.reducer;

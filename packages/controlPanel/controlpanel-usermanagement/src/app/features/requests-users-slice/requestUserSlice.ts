import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { RequestUserModel } from "../../models/requests-users/requestUserModel";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchRequestUser = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "requestUser/fetchRequestUser",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getRequestByUserId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const deleteRequestUser = createAsyncThunk<
  ResponseModel,
  number | Number | string
>("requestUser/deleteRequestUser", async (id: number | Number | string, thunkApi) => {
  try {
    let response = await UserManagmentConsume?.deleteUserRequest(id);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});
export const editUser = createAsyncThunk<ResponseModel, any>(
  "requestUser/editUser",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.putUser(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface user {
  data: RequestUserModel;
  status: string;
  message: string;
}
let initialState: user = {
  data: new RequestUserModel("", "", "", "", "", "", "", new Date(), ""),
  status: "idle",
  message: "",
};

const requestUserSlice = createSlice({
  name: "requestUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestUser.pending, (state: user) => {
        state.status = "loading";
      })
      .addCase(
        fetchRequestUser.fulfilled,
        (state: user, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as RequestUserModel;
        }
      )
      .addCase(
        fetchRequestUser.rejected,
        (state: user, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(editUser.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(
        editUser.fulfilled,
        (state: any, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(editUser.rejected, (state: any, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message;
      }).addCase(deleteRequestUser.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(
        deleteRequestUser.fulfilled,
        (state: any, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteRequestUser.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
      ;
  },
});

export default requestUserSlice.reducer;

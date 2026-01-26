import { ResponseModel } from "./../../models/response-model";
// productSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DomainModel } from "../../models/domain/add-domain-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const addDomain = createAsyncThunk<ResponseModel, DomainModel>(
  "addDomain",
  async (data: DomainModel, thunkApi) => {
    try {
      const response = await UserManagmentConsume.addDomain(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const addDomainSlice = createSlice({
  name: "addDomain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDomain.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addDomain.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addDomain.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addDomainSlice.reducer;

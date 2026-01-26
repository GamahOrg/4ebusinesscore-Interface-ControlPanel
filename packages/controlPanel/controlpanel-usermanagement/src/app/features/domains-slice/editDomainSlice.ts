import { EditDomainModel } from "./../../models/domain/edit-domain-model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const editDomain = createAsyncThunk<ResponseModel, EditDomainModel>(
  "editDomain/domain",
  async (updatedData, thunkApi) => {
    try {
      const response = await UserManagmentConsume.editDomain(
        updatedData,
        updatedData?.id
      );
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const editDomainSlice = createSlice({
  name: "editDomain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editDomain.pending, (state) => {
        state.status = "loading";
        state.message=""
      })
      .addCase(
        editDomain.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editDomain.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default editDomainSlice.reducer;

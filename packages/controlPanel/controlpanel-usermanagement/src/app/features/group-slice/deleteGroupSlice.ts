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

export const deleteGroup = createAsyncThunk<
  ResponseModel,
  number | Number | string
>("deleteGroup", async (id: number | Number | string, thunkApi) => {
  try {
    let response = await UserManagmentConsume.deleteGroup(id);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const deleteGroupSlice = createSlice({
  name: "deleteGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroup.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        deleteGroup.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteGroup.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default deleteGroupSlice.reducer;
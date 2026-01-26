import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const editUserSummary = createAsyncThunk<ResponseModel, any>(
  "editUserSummary",
  async (updatedData, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume?.editUserSummary({
        body: {
          userName: updatedData?.userName,
          email: updatedData?.email,
          phoneNumber: updatedData?.phoneNumber,
          address: updatedData?.address,
          nationalId: updatedData?.nationalId,
          managerId: updatedData?.managerId,
          userGender: updatedData?.userGender,
          firstName: updatedData.firstName,
          secondName: updatedData.secondName,
          thirdName: updatedData.thirdName,
          forthName: updatedData.forthName,
          orgId: updatedData.orgId,
        },
        id: updatedData?.id,
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const editUserSummarySlice = createSlice({
  name: "editUserSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserSummary.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(
        editUserSummary.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editUserSummary.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default editUserSummarySlice.reducer;

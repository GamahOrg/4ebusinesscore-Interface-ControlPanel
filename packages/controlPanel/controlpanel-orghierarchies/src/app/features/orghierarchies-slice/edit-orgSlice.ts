import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";

const initialState = {
  status: "idle",
  message: "",
};

// Create an async thunk for editing an organization
export const editOrg = createAsyncThunk<ResponseModel, object>(
  "org/editOrg",
  async (updateOrg: {}, thunkApi) => {
    try {
      const response = await OrgConsume.update(updateOrg);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// Create the editOrg slice
const editOrgSlice = createSlice({
  name: "editOrg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editOrg.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        editOrg.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(editOrg.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message;
      });
  },
});

export default editOrgSlice.reducer;

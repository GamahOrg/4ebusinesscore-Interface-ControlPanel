
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";

export const fetchOrgPath = createAsyncThunk<ResponseModel, any>(
  "orgs/fetchOrgPath",
  async (id: string) => {

    const response = await OrgConsume.getOrgPath(id);
    return response;
  });
interface OrgPathState {
  data: string[];
  status: string;
  message: string;
}
let initialState: OrgPathState = {
  data: [],
  status: "idle",
  message: "",
};
export const orgPathSlice = createSlice({
  name: 'orgPath',
  initialState,
  reducers: {
    setOrgPathData(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgPath.pending, (state: OrgPathState) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgPath.fulfilled,
        (state: OrgPathState, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as string[];

        }
      )
      .addCase(
        fetchOrgPath.rejected,
        (state: OrgPathState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;

        }
      );
  },
})

export const { setOrgPathData } = orgPathSlice.actions;
export default orgPathSlice.reducer
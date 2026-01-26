import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrgHierarchyModel } from "../../models/org-model";
import { ResponseModel } from "../../models/response-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";

export const fetchOrgs = createAsyncThunk<ResponseModel, object | undefined>(
  "orgs/fetchorgs",
  async (query = {}) => {
    const response = await OrgConsume.getAllOrgs(query);
    return response;
  }
);

interface OrgHierarchy {
  data: OrgHierarchyModel[];
  status: string;
  message: string;
}
let initialState: OrgHierarchy = {
  data: [],
  status: "idle",
  message: "",
};

const orgSlice = createSlice({
  name: "OrgHierarchy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state: OrgHierarchy) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgs.fulfilled,
        (state: OrgHierarchy, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as OrgHierarchyModel[];
        }
      )
      .addCase(
        fetchOrgs.rejected,
        (state: OrgHierarchy, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

//export const { addOrgToStore } = orgSlice.actions;
export default orgSlice.reducer;

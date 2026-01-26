import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { WorkspaceComponentModel } from "../models/workspaceComponent-model";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
interface EditSubsystemPartsArgs {
  id: string;
  item: {};
}

export const editSubsystemParts = createAsyncThunk<
  ResponseModel,
  EditSubsystemPartsArgs,
  AsyncThunkConfig
>("workspace/editSubsystemParts", async ({ id, item }, thunkAPI) => {
  try {
    const response = await WorkspaceConsume.editWorkspaceParts(id, item);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: "An error occurred" });
  }
});

interface SubsystemPartsState {
  item: WorkspaceComponentModel;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemPartsState = {
  item: new WorkspaceComponentModel(
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    false,
    "",
    "",
    "",
    "",
    "",
    "",
    { id: "", nameAr: "", nameEn: "" }
  ),
  status: "idle",
  error: null,
};
const editDataSlice = createSlice({
  name: "editData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editSubsystemParts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSubsystemParts.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editSubsystemParts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default editDataSlice.reducer;

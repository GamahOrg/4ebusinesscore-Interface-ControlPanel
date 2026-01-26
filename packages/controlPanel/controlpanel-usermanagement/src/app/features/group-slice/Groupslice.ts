import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { GroupDTO } from "../../models/group/group-by-id-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchGroupById = createAsyncThunk<ResponseModel, { id: string }>(
  "groupbyid/fetchGroupById",
  async ({ id }) => {
    // const response = await groupsApiConsume.getGroupById(id);
    const response = await ControlPanelAggConsume.getGroupById(id);
    return response;
  }
);
interface group {
  data: GroupDTO;
  status: string;
  message: string;
}
let initialState: group = {
  data: new GroupDTO(
    "",
    new Date(),
    new Date(),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    [],
    []
  ),
  status: "idle",
  message: "",
};

const groupbyidSlice = createSlice({
  name: "groupbyid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupById.pending, (state: group) => {
        state.status = "loading";
      })
      .addCase(
        fetchGroupById.fulfilled,
        (state: group, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as GroupDTO;
        }
      )
      .addCase(
        fetchGroupById.rejected,
        (state: group, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default groupbyidSlice.reducer;

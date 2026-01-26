import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import WorkSpaceSystem from "../models/WorkSpace";

interface initialStateType {
  items: WorkSpaceSystem[];
  item: WorkSpaceSystem;
  status: RequestStatus;
  error: string | null;
}
const initialState: initialStateType = {
  items: [],
  item: new WorkSpaceSystem(),
  status: RequestStatus.idle,
  error: null,
};
export const addWorkSpaceCard = createAsyncThunk(
  "addWorkSpaceCard",
  async (data: WorkSpaceSystem, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.AddCardsystems(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const addWorkSpaceCardSlice = createSlice({
  name: "addWorkSpaceCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWorkSpaceCard.pending, (state: initialStateType) => {
        state.status = RequestStatus.loading;
      })
      .addCase(
        addWorkSpaceCard.fulfilled,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.items = [
            ...state.items,
            action.payload.result,
          ] as WorkSpaceSystem[];
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(
        addWorkSpaceCard.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = RequestStatus.failed;
        }
      );
  },
});

export default addWorkSpaceCardSlice.reducer;

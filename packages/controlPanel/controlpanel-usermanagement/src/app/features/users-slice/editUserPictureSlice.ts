import { ResponseModel } from "./../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const editUserPicture = createAsyncThunk<ResponseModel, any>(
  "editUserPicture",
  async (data: any, thunkApi) => {
    let formData = new FormData();
    formData.append("ProfilePicture", data?.data);
    try {
      const response = await UserManagmentConsume.putUserPicture({body:formData, id:data?.id});
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const editUserPictureSlice = createSlice({
  name: "editUserPicture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserPicture.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        editUserPicture.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editUserPicture.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default editUserPictureSlice.reducer;

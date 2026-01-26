import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ResponseModel} from '../partials/response-model'
// import { PlatformConsume } from '../services/platform-axios'
import { PlatformConsume } from '@4eplatform/shared/apis/system_setting'
export const EditPlatformMainSettings = createAsyncThunk<ResponseModel, any>('editPlatformMainSettings', async (data: any, id: any) => {
  try {
    const response = await PlatformConsume.putPlatformSettings(data)
    return response
  } catch (err: any) {
    return data
  }
})
interface PlatformState {
  data: any
  loading: boolean
  error: string | null
  message: string | null
}

const initialState: PlatformState = {
  data: [],
  loading: false,
  error: null,
  message: '',
}

const AddPlatformSettingsSlice = createSlice({
  name: 'EditPlatformMainSettings',
  initialState,
  reducers: {
    addItemLocally: (state, action) => {
      state.data.push(action.payload)
    },
  },  
  extraReducers(builder) {
    builder.addCase(EditPlatformMainSettings.pending, (state: PlatformState) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(EditPlatformMainSettings.fulfilled, (state: PlatformState, action: PayloadAction<ResponseModel>) => {
      state.loading = false
      state.error = null
      state.message = 'success'
    })
    builder.addCase(EditPlatformMainSettings.rejected, (state: PlatformState, action: PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload ? action.payload.error : 'Failed to add item'
    })
  },
})

export default AddPlatformSettingsSlice.reducer

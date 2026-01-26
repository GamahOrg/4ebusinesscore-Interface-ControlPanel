import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import {PlatformConsume} from '../services/platform-axios'
import { PlatformConsume } from '@4eplatform/shared/apis/system_setting'

import {ResponseModel} from '../partials/response-model'

export const addPlatformSites = createAsyncThunk<ResponseModel, any>('addPlatformMainSites', async (data: any, thunkApi) => {
  try {
    const response = await PlatformConsume.postMainSites(data)
    return response
  } catch (err: any) {
    return thunkApi.rejectWithValue(err)
  }
})
interface PlatformState {
  sitesData: any
  loading: boolean
  error: string | null
}

const initialState: PlatformState = {
  sitesData: [],
  loading: false,
  error: null,
}

const AddPlatformSitesSlice = createSlice({
  name: 'addPlatformSites',
  initialState,
  reducers: {
    addItemLocally: (state, action) => {
      state.sitesData.push(action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(addPlatformSites.pending, (state: PlatformState) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addPlatformSites.fulfilled, (state: PlatformState, action: PayloadAction<ResponseModel>) => {
      state.loading = false
      state.error = null
      state?.sitesData?.push(action.payload.result as any)
    })
    builder.addCase(addPlatformSites.rejected, (state: PlatformState, action: PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload ? action.payload.error : 'Failed to add item'
    })
  },
})

export default AddPlatformSitesSlice.reducer

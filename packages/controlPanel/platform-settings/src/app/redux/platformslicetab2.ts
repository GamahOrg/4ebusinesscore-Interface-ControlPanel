import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import {PlatformConsume} from '../services/platform-axios'
import { PlatformConsume } from '@4eplatform/shared/apis/system_setting'

import {ResponseModel} from '../partials/response-model'
import {MainSettingsModel} from '../model/platform-sites-model'

export const fetchSites = createAsyncThunk<ResponseModel>('fetchSites', async () => {
  const response = await PlatformConsume.getSitesDepartment({
    pageIndex: 1,
    pageSize: 5,
  })
  return response
})
export const addPlatformDepartment = createAsyncThunk<ResponseModel, any>('addPlatformDepartment', async (data: any, thunkApi) => {
  try {
    const response = await PlatformConsume.postPlatformDepartment(data)
    return response
  } catch (err: any) {
    return thunkApi.rejectWithValue(err)
  }
})
export const addPlatformIcon = createAsyncThunk<ResponseModel, any>('addPlatformIcon', async (data: any, thunkApi) => {
  try {
    const response = await PlatformConsume.postPlatformIcon(data)
    return response
  } catch (err: any) {
    return thunkApi.rejectWithValue(err)
  }
})
interface PlatformState {
  sitesData: MainSettingsModel[]
  loading: boolean
  error: string | null
  message: string | null
}

const initialState: PlatformState = {
  sitesData: [],
  loading: false,
  error: null,
  message: '',
}

const PlatformSliceTab2 = createSlice({
  name: 'platformSites',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder.addCase(addPlatformDepartment.pending, (state) => {
      state.loading = true
    })
      builder.addCase(addPlatformDepartment.fulfilled, (state, action) => {
        state.message = 'success'
        state.loading = false
        state.error = null
      })
      builder.addCase(addPlatformDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      builder.addCase(fetchSites.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchSites.fulfilled, (state, action) => {
        state.sitesData = action.payload.result as unknown as MainSettingsModel[]
        state.loading = false
        state.error = null
      })
      builder.addCase(fetchSites.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      builder.addCase(addPlatformIcon.pending, (state) => {
        state.loading = true
      })
      builder.addCase(addPlatformIcon.fulfilled, (state, action) => {
        state.message = 'success'
        state.loading = false
        state.error = null
      })
      builder.addCase(addPlatformIcon.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
  },
})

export default PlatformSliceTab2.reducer

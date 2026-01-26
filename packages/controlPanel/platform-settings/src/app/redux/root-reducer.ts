import {combineReducers} from '@reduxjs/toolkit'
import PlatformReducer from './platfromslice'

const rootReducer = combineReducers({
  platform: PlatformReducer,
  
})

export default rootReducer

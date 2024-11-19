import { configureStore } from '@reduxjs/toolkit'
import {appointmentsSlice} from './utils/appointmentsSlice'



const store = configureStore({
  reducer: appointmentsSlice,
})

export default store

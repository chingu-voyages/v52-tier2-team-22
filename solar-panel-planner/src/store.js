import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./utils/appointmentsSlice";

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});

export default store;

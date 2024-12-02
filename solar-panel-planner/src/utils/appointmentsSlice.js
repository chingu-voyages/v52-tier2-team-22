import { createSlice } from "@reduxjs/toolkit";
import { userDb } from "../userDb";

const initialState = { appointments: userDb };


export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      console.log(state, action);
      state.appointments.push(action.payload);
    },
  },
});

export const { addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

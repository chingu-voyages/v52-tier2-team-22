import { createSlice } from "@reduxjs/toolkit";
import { userDb } from "../userDb";

const initialState = { appointments: userDb };

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      // console.log(state, action);
      state.appointments.push(action.payload);
    },
    deleteAppointment: (state, action) => {
      const index = action.payload;
      state.appointments = state.appointments.filter((_, i) => i !== index);
    },
  },
});

export const { addAppointment, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

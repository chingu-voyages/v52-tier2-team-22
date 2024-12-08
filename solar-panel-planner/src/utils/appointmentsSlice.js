import { createSlice } from "@reduxjs/toolkit";
import { userDb } from "../userDb";
// import { deleteState, loadState, saveState } from "./localStorageUtils";

const initialState = { appointments: userDb };
// appointments: loadState() ? [...userDb, loadState()] : [...userDb],

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
      // saveState(action.payload);
      // state.appointments = [...state.appointments, action.payload];
    },
    deleteAppointment: (state, action) => {
      // deleteState();
      state.appointments = state.appointments.filter(
        (item) => item.id !== action.payload
      );
    },

    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.appointments.find((item) => item.id === id);
      if (appointment) {
        appointment.status = status;
        // saveState(state.appointments);
      }
    },
  },
});

export const { addAppointment, deleteAppointment, updateAppointmentStatus } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

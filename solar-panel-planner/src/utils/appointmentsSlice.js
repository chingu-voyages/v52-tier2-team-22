import { createSlice } from "@reduxjs/toolkit";
import { userDb } from "../userDb";
import { deleteState, saveState } from "./localStorageUtils";

const initialState = { appointments: userDb };

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      // state.appointments.push(action.payload);
      saveState(action.payload);
      state.appointments = [...state.appointments, action.payload];
    },
    deleteAppointment: (state, action) => {
      const index = action.payload;
      deleteState();
      state.appointments = state.appointments.filter((item) => {
        item.id !== index;
      });
      // state.appointments = state.appointments.filter((_, i) => i !== index);
    },
  },
});

export const { addAppointment, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { deleteState, saveState } from "./localStorageUtils";

const initialState = {
  appointments: {},
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
      saveState(action.payload, "myRequest");
    },
    deleteAppointment: (state, action) => {
      deleteState();
      state.appointments = state.appointments.filter(
        (item) => item.id !== action.payload
      );
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      state.appointments = state.appointments.map((req) => {
        if (req.id === id) return { ...req, status: status };
        return { ...req };
      });
      saveState(
        state.appointments.map((req) => {
          if (req.id === id) return { ...req, status: status };
          return { ...req };
        }),
        "requests"
      );
    },
  },
});

export const { addAppointment, deleteAppointment, updateAppointmentStatus } =
  appointmentsSlice.actions;
export default appointmentsSlice.reducer;

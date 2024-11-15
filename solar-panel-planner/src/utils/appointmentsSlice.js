import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: []
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      console.log(state, action);
      state.appointments.push(action.payload)
    },
  },
});

export const { addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

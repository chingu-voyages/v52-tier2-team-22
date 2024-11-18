import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    // {
    //   name: "Mike Jenkins",
    //   email: "mikejenkins56@gmail.com",
    //   phone: "123-325-5678",
    //   address: "NY street 75",
    //   date: "11-1-2024",
    // },
    // {
    //   name: "Carol Smith",
    //   email: "carolsmith35@gmail.com",
    //   phone: "5678-325-568",
    //   address: "Coastal highway",
    //   date: "09-4-2023",
    // },
    // {
    //   name: "Nakamoto Ron",
    //   email: "nakamotoron23@gmail.com",
    //   phone: "+78-325-568",
    //   address: "Karate club driveway 23",
    //   date: "07-8-2024",
    // }
  ]
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

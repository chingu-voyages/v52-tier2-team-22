import { createSlice } from "@reduxjs/toolkit";
import {userDb} from "../userDb"

const initialState = userDb

export const appointmentsSlice = createSlice({

    name: 'appointments',
    initialState,
    reducers: {
        addAppointment: (state, action) => {
            console.log(state, action);
            
        }
    }
})

export const { addAppointment } = appointmentsSlice.actions
export default appointmentsSlice.reducer

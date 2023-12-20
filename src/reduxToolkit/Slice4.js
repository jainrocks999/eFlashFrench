import { createSlice } from "@reduxjs/toolkit";

const initialState = true;
const SoundSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {

        Sound(state, action) {
            state = action.payload
            return state
        }

    }
})
export const { Sound } = SoundSlice.actions
export default SoundSlice.reducer
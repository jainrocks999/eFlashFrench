import {createSlice} from '@reduxjs/toolkit';

const initialState = false;
const SoundSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addPagable(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {addPagable} = SoundSlice.actions;
export default SoundSlice.reducer;

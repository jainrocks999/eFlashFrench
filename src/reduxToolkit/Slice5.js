import {createSlice} from '@reduxjs/toolkit';

const initialState = false;
const addCancle = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addCancleble(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {addCancleble} = addCancle.actions;
export default addCancle.reducer;

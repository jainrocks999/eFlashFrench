import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const dataSlie = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addData(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {addData} = dataSlie.actions;
export default dataSlie.reducer;

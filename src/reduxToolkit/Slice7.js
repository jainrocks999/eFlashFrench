import {createSlice} from '@reduxjs/toolkit';

const initialState = false;
const CatgorySlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addCatNext(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const {addCatNext} = CatgorySlice.actions;
export default CatgorySlice.reducer;

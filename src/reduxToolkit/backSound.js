import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  fromQuestion: false,
  fromDetails: false,
};
const backSoundfromSetting = createSlice({
  name: 'backSoundFromquestions',
  initialState,
  reducers: {
    playWhenThePage: (state, action) => {
      state.fromQuestion = action.fromQuestion;
      state.fromDetails = action.fromDetails;
      return state;
    },
  },
});
export default backSoundfromSetting.reducer;

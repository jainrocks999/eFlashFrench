import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './Slice';
import settingReducer from './Slice2';
import questionReducer from './Slice3';
import SoundSlice from './Slice4';
import Slice5 from './Slice5';
import Slicer6 from './Slicer6';
import Slicer7 from './Slice7';

const myStore = configureStore({
  reducer: {
    Items: dataReducer,
    setting: settingReducer,
    question: questionReducer,
    sound: SoundSlice,
    cancle: Slice5,
    page: Slicer6,
    catdata: Slicer7,
  },
});
export default myStore;

import { createSlice } from "@reduxjs/toolkit";

const initialState=[];
const settingSlice=createSlice({
      name:'userData',
      initialState,
      reducers:{
         
        addSetting(state,action){
            state =action.payload
            return state
        }
          
      }
})
export const {addSetting}=settingSlice.actions
export default settingSlice.reducer
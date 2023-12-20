import { createSlice } from "@reduxjs/toolkit";

const initialState=false;
const questionSliece=createSlice({
      name:'userData',
      initialState,
      reducers:{
         
        QuestionMode(state,action){
            state =action.payload
            return state
        }
          
      }
})
export const {QuestionMode}=questionSliece.actions
export default questionSliece.reducer
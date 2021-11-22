import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:'',
    avatar:'',
    profile:false,
    education:false,
    experince:false,
}

export const activateSlice = createSlice({
    name:'activate',
    initialState,
    reducers:{
        setName: (state, action) =>{
            state.name = action.payload;;
        },
        setAvatar: (state, action)  =>{
            state.avatar = action.payload;
        },
        setProgrssBar: (state, action) =>{
            state.profile = action.payload;
        },
        setEducationProgress: (state, action) =>{
            state.education = action.payload
        }
    }
})


// Action creators are generated for each case reducer function
export const { setName, setAvatar, setProgrssBar, setEducationProgress } = activateSlice.actions

export default activateSlice.reducer;
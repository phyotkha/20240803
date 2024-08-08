import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    username: "",
    email: "",
    profile_pic: "",
    token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic
        },
        setToken: (state, action) => {
            state.token = action.payload
        }, 
        logout: (state, action) => {
            state._id = ""
            state.username = ""
            state.email = ""
            state.profile_pic = ""
            state.token = ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = userSlice.actions

export default userSlice.reducer
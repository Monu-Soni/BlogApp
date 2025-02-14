import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.userData = action.payload
            state.status = true
        },
        logOut: (state) => {
            state.userData = null
            state.status = false
        },
    }
})

export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer
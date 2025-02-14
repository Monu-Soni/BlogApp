import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const Store = configureStore({
   reducer: { Auth: authSlice }
})

export default Store
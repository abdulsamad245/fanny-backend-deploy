import { configureStore } from "@reduxjs/toolkit";

// reducres
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
})
import { configureStore } from "@reduxjs/toolkit";
import DarkModeReducer from "../Reducers/DarkModeReducer";

const store = configureStore({
    reducer: {
        theme: DarkModeReducer
    }
});
export default store;

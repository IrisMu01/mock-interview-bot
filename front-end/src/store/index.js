import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    chat: chatReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import chatReducer from './chatSlice';
import submissionReducer from "./submissionSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    chat: chatReducer,
    submission: submissionReducer,
    ui: uiReducer,
  },
});

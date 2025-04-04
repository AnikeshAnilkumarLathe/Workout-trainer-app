import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileslice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;

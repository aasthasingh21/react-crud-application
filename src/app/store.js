import { configureStore } from "@reduxjs/toolkit";   // make a store for redux toolkit
import  userDetails  from "../features/userDetailslice";   // import without {}

export const store = configureStore({
  reducer: {
    app: userDetails,   // key here = app, by this we will be accesing the userdetails
  },
});
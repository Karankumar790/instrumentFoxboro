import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../AdminDashoard/Category/CategorySlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

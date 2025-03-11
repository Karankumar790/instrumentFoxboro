import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../AdminDashoard/Category/CategorySlice";
import authReducer from "../AuthCycle/Login/loginSlice";
import signUpReducer from "../AuthCycle/SignUp/SignUpSlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth:authReducer,
    signUp:signUpReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { thunk } from "redux-thunk";  

import categoryReducer from "../AdminDashoard/Category/CategorySlice";
import authReducer from "../AuthCycle/Login/loginSlice";
import signUpReducer from "../AuthCycle/SignUp/SignUpSlice";
import authForgetReducer from "../AuthCycle/Forget/forgetSlice";
import productByCategory from "../AdminDashoard/Category/CategoryProductSlice";
import AdminFoxboroProduct from "../AdminDashoard/AdminProduct/AdminProductSlice";
import SoftwareSlice from "../AdminDashoard/AdminSoftware/SoftwareSlice";
import SettingSlice from "../AdminDashoard/SiteSetting/SettingSlice";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Wrap the authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store without custom middleware
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: persistedAuthReducer,
    signUp: signUpReducer,
    authForget: authForgetReducer,
    product: productByCategory,
    foxLineProduct: AdminFoxboroProduct,
    software: SoftwareSlice,
    header: SettingSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Create the persisted store
export const persistor = persistStore(store);

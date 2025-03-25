import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import categoryReducer from "../AdminDashoard/Category/CategorySlice";
import authReducer from "../AuthCycle/Login/loginSlice";
import signUpReducer from "../AuthCycle/SignUp/SignUpSlice";
import authForgetReducer from "../AuthCycle/Forget/forgetSlice";
import productByCategory from "../AdminDashoard/Category/CategoryProductSlice"

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage engine (localStorage by default)
  whitelist: ["auth"], // Only persist the 'auth' reducer
};

// Wrap the authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: persistedAuthReducer, // Use the persisted auth reducer
    signUp: signUpReducer,
    authForget: authForgetReducer,
    product:productByCategory,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore Redux Persist actions
      },
    }),
});

// Create the persisted store
export const persistor = persistStore(store);
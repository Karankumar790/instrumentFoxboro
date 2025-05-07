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
import RunNewSlice from "../AdminDashoard/Run&NewProject/RunNewSlice";
import newProductSlice from "../AdminDashoard/Run&NewProject/newProductSlice";
import PoSlice from "../pages/PoUpload/PoSlice";
import workFoxSlice from "../pages/WorkFoxboro/workFoxSlice";
import AdminServiceSlice from "../AdminDashoard/AdminService/AdminServiceSlice";
import serviceSlice from "../AdminDashoard/ServiceManager/serviceSlice";
import managerWorkFoxReducer  from "../AdminDashoard/ServiceManager/ManagerWorkFox/ManagerWorkSlice";


// Configuration for Redux Persist
const persistConfig = {
  key: "auth",
  storage,
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
    rnProject: RunNewSlice,
    newProduct: newProductSlice,
    poUploads: PoSlice,
    service: AdminServiceSlice,
    serviceManager: serviceSlice,
    foxboro: workFoxSlice,
    managerFoxboro: managerWorkFoxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["_persist"],
      },
    }).concat(thunk),
});

// Create the persisted store
export const persistor = persistStore(store);

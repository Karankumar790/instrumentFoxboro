import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./api/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <App />
        <Footer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

import React from "react";
import Content from "./pages/content.jsx";
import Product from "./pages/product.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;

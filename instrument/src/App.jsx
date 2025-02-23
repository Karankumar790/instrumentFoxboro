import React from "react";
import Content from "./pages/content.jsx";
import Product from "./pages/product.jsx";
import Software from "./pages/software.jsx";
import Estore from "./pages/estore.jsx";
import Support from "./pages/support.jsx";
import OneProduct from "./pages/oneclickproduct.jsx";
import Service from "./pages/service.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/product" element={<Product />} />
        <Route path="/software" element={<Software />} />
        <Route path="/estore" element={<Estore />} />
        <Route path="/support" element={<Support />} />
        <Route path="/products" element={<OneProduct />} />
        <Route path="/service" element={< Service/>} />
      
        
      </Routes>
    </>
  );
}

export default App;

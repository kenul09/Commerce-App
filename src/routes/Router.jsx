import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Basket from "../pages/Basket";
import Favorites from "../pages/Favorites";
import ProductDetails from "../pages/ProductDetails";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default Router;

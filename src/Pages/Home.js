import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
};

export default Home;

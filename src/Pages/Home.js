import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default Home;

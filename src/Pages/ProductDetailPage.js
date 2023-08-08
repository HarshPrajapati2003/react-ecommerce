import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/Navbar/Navbar'
import Footer from "../features/common/Footer";
const ProductDetailPage = () => {
  return (
    <div>
    <Navbar>
      <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage

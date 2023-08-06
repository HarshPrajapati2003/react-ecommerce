import React from "react";
import ProductForm from "../features/Admin/components/ProductForm";
import Navbar from "../features/Navbar/Navbar";
const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;

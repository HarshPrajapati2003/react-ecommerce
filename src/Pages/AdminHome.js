import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/Admin/components/AdminProductList";
const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
};

export default AdminHome;

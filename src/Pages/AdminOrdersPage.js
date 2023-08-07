import React from "react";
import AdminOrders from "../features/Admin/components/AdminOrders";
import Navbar from "../features/Navbar/Navbar";

const AdminOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </div>
  );
};

export default AdminOrdersPage;

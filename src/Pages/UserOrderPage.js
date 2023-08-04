import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/Navbar/Navbar";
const UserOrderPage = () => {
  return (
    <>
      <Navbar>
      <h1 className="mx-3 text-2xl">My Orders</h1>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
};

export default UserOrderPage;

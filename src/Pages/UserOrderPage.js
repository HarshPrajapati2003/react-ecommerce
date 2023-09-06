import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/Navbar/Navbar";
const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
};

export default UserOrderPage;

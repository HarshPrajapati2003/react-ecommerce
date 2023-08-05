import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/Navbar/Navbar";
const UserProfilePage = () => {
  return (
    <>
      <Navbar>
      <h1 className="mx-3 text-2xl">My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
    </>
  );
};

export default UserProfilePage;

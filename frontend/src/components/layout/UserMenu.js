import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center dashboard-menu">
      <div className="list-group" style={{ color: "#fff", height: "90vw" }}>
        <h4>Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action mb-2"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action mb-2"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;

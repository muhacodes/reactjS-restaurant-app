import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Menu() {
  const location = useLocation();

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isPathMatched = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      <ul className="flex flex-col gap-4 mt-10">
        <Link
          to="profile"
          className={` ${
            isPathMatched("dashboard/profile")
              ? "border-primary text-red-500"
              : ""
          }  flex items-center gap-4 p-4 border rounded-xl`}
        >
          <i className="fas fa-map-marker-alt"></i>
          <span className="text-sm font-semibold"> Personal Information </span>
        </Link>

        <Link
          to="orders"
          className="flex items-center gap-4 p-4 border rounded-xl"
        >
          <i className="fas fa-map-marker-alt"></i>
          <span className="text-sm font-semibold"> Orders </span>
        </Link>

        <Link
          to="favorite-items"
          className="flex items-center gap-4 p-4 border rounded-xl"
        >
          <i className="fas fa-map-marker-alt"></i>
          <span className="text-sm font-semibold"> Favorite Items </span>
        </Link>

        <Link
          to="change-password"
          className="flex items-center gap-4 p-4 border rounded-xl"
        >
          <i className="fas fa-map-marker-alt"></i>
          <span className="text-sm font-semibold"> Change Password </span>
        </Link>

        <button onClick={handleLogout} className="flex items-center gap-4 p-4 border rounded-xl">
          <i className="fas fa-map-marker-alt"></i>
          <span className="text-sm font-semibold"> Logout </span>
        </button>
      </ul>
    </>
  );
}

export default Menu;

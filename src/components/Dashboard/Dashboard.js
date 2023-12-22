import React, { Context, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Menu from "./Menu";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
  Switch,
} from "react-router-dom";
import Profile from "./Profile";
import Order from "./Order";
import Favorite from "./Favorite";
import { Link, useNavigate } from "react-router-dom";

function DashboardUI() {
 

  return (
    <>
      <div className="flex flex-col mx-auto mt-10 mb-10 lg:mt-20 lg:flex-row max-w-7xl">
        <div className="flex flex-col w-[100%] lg:w-[30%]">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-login_bg">
            <div className="relative mt-10">
              <i className="absolute bottom-0 right-0 text-red-500 fas fa-camera"></i>
              <img
                className="w-24 h-24 p-1 bg-white border border-gray-600 rounded-full"
                src="https://html.themefax.com/restina/assets/images/dashboard_user_img.png"
              />
            </div>

            <span className="text-xl font-semibold mt-7"> Addition Smith </span>
            <span className="mt-2 mb-10 text-base font-semibold">
              {" "}
              muha.oq3@gmail.com{" "}
            </span>
          </div>

          <Menu />
        </div>
        <div className="flex flex-col px-5 py-2 w-full mt-10 lg:mt-0 lg:w-[70%] text-start">
          <Routes>
            <Route path="profile" exact element={<Profile />} />
            <Route path="orders" exact element={<Order />} />
            <Route path="favorite-items" exact element={<Favorite />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardUI;

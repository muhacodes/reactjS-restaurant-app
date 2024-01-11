import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { useSelector } from "react-redux";

function Navigation({ login }) {
  const [isSticky, setSticky] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const { cartItems } = useContext(CartContext);
  const [menuVisible, SetMenuVisible] = useState(false);
  const routes = ["/login", "/dashboard", "/register", "/order-success"];
  const location = useLocation();
  const route = location.pathname;
  const visible = routes.some((r) => route.startsWith(r));
  // console.log(cartItems);

  const logo = "https://cafejavas.co.ug/root-assets/images/logo.png";
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100; // This is the scroll position you choose to trigger the sticky nav
    // setSticky(stickyClass);

    setSticky(stickyClass);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="w-full bg-top_color">
        <div className="flex p-2 lg:w-[85%] py-5 mx-auto justify-between">
          <div className="flex items-center gap-4">
            <i className="text-primary fas fa-shipping-fast "></i>
            <p className="text-xs font-medium tracking-widest text-white">
              Free Delivery via mobile app{" "}
            </p>
          </div>
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 hover:text-primary"
          >
            <i className="text-white fa fa-user" aria-hidden="true"></i>
            <button className="text-sm text-white"> My account </button>
          </Link>
        </div>
      </div>

      <div
        id="top_nav"
        className={` ${isSticky ? "top-0 shadow-xl sticky " : ""} ${
          login ? "shadow-xl" : ""
        } w-full bg-white z-50 transition-all duration-75 ease-in`}
      >
        <nav
          className={` flex flex-col md:flex-row justify-between py-4 items-center  mx-auto lg:w-[85%]`}
        >
          <div className="flex items-center justify-between w-full gap-20 px-4 md:w-auto">
            <a className="h-10 w-[170px] lg:w-[250px]">
              <img className="h-[100%] w-[100%]" src={logo} />
            </a>
            <i
              onClick={() => SetMenuVisible((prev) => !prev)}
              className="flex md:hidden fas fa-bars"
            ></i>
            <ul className={`md:flex items-center hidden gap-10`}>
              <Link
                to="/"
                className="p-2 text-xl font-bold text-gray-800 cursor-pointer hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/featured"
                className="p-2 text-xl font-bold text-gray-800 cursor-pointer hover:text-primary"
              >
                Featured Products
              </Link>
            </ul>
          </div>
          {menuVisible && (
            <div className="flex flex-col w-full py-4 mt-5 md:hidden bg-secondary">
              <ul className={`flex flex-col items-start gap-4`}>
                <Link
                  to="/"
                  className="p-2 font-bold text-gray-800 cursor-pointer md:text-xl hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  to="/featured"
                  className="p-2 font-bold text-gray-800 cursor-pointer md:text-xl hover:text-primary"
                >
                  Featured Products
                </Link>
              </ul>
            </div>
          )}
          <div className="hidden gap-4 md:flex">
            <Link to="/cart" className="relative flex p-5 border rounded-full">
              <span className="absolute top-0 text-xs h-[24px] w-[24px] flex justify-center p-1 rounded-full right-0 bg-primary">
                {cartItems.length}
              </span>
              <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            </Link>
            <Link className="flex items-center gap-2 px-4 py-2 border hover:bg-white bg-primary">
              <i
                className="text-gray-800 fa fa-cart-plus"
                aria-hidden="true"
              ></i>
              <button className="font-bold tracking-widest text-black capitalize">
                {" "}
                Order Now{" "}
              </button>
            </Link>
          </div>
        </nav>
      </div>

      {!visible && (
        <Link
          to="/cart"
          className="fixed right-0 z-50 flex p-5 bg-orange-600 border rounded-full md:hidden bottom-4"
        >
          <span className="absolute top-0 text-xs h-[24px] w-[24px] flex justify-center p-1 rounded-full right-0 bg-primary">
            {cartItems.length}
          </span>
          <i className="fa fa-shopping-basket" aria-hidden="true"></i>
        </Link>
      )}
    </>
  );
}

export default Navigation;

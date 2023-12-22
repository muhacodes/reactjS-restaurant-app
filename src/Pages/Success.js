import React, { useEffect, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import CartGrid from "../components/CartGrid";

function Success() {
  return (
    <>
      <Navigation />

      <Top_Banner title="Order Confirmed" />

      <div className="flex flex-col items-center max-w-6xl py-10 mx-auto my-10 border border-t-0 shadow-md ">
        <span className="text-4xl text-green-500 lg:text-9xl material-icons">
          check_circle
        </span>

        <span className="mt-10 text-4xl font-bold tracking-widest "> Order Confirmed </span>

        <button className="px-10 py-4 mt-10 border rounded-full bg-primary"> Go to Your Orders </button>
      </div>
    </>
  );
}

export default Success;

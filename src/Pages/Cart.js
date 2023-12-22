import React, { useEffect, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import CartGrid from "../components/CartGrid";


function Cart() {
  return (
    <>
    <Navigation />

    
    <Top_Banner title="My Cart" />

    <CartGrid />
    </>
  )
}

export default Cart
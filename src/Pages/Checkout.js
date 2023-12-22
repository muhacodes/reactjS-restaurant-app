import React, { useContext, useEffect } from "react";

import Navigation from "../components/Navigation";
import Top_Banner from "../components/Top_Banner";
import Billing from "../components/Billing";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     console.log("not logged in");
  //     navigate('/login');
  //     console.log(loggedIn);
  //   }
  // }, []);
  return (
    <>
      <Navigation />
      <Top_Banner title="Checkout" />

      <Billing />
    </>
  );
}

export default Checkout;

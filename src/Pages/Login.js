import React, { useEffect, useContext, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import CartGrid from "../components/CartGrid";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

function SignIn() {
  
  return (
    <>
      <Navigation login="true" />

      <Login />
    </>
  );
}

export default SignIn;

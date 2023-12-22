import React, { useEffect, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import CartGrid from "../components/CartGrid";
import Login from "../components/Login";
import Register from "../components/Register";

function SignUp() {
  return (
    <>
      <Navigation login="true" />

      <Register />
    </>
  );
}

export default SignUp;

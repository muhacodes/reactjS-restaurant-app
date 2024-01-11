import React, { useEffect, useState } from "react";
import { Route, json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../store/auth/auth";

const Protected = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    // const userToken = localStorage.getItem("auth");
    const auth = localStorage.getItem("auth");
    console.log(JSON.parse(auth));
    if (!auth || auth === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    
    dispatch(AuthActions.initialLogin(JSON.parse(auth)))
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? props.children : null}</>;
};

export default Protected;

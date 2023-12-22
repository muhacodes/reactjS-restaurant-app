import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {AuthContext} from '../context/AuthContext';
import config from "../Config";

function Login() {
  const [loading, setLoading] = useState(false);
  const {updateAuth} = useContext(AuthContext);
  const[formValid, setFormValid] = useState(false);
  const location = useLocation();
  // const signIn = useSignIn();
  // const signIn = useSignIn()

  const [error, SetError] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // console.log(formData);
    if(formData.email.includes('@') && formData.password.length > 6){
      setFormValid(true);
    }else{
      setFormValid(false)
    }
    
  }, [formData])

  const handleChange = (e) => {
    SetError([]);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const RegisterForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${config.appUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        const responseData = await response.json();
        if (response.status === 401) {
          SetError(["Invalid Credentials"]);
        } else {
          SetError(responseData["errors"]);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      updateAuth(res);
      setLoading(false);
      location?.state !== null ? navigate(location.state) : navigate("/cart");
      // navigate("/dashboard/profile");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row h-[100vh] items-center bg-login_bg w-full">
        <div className="h-[100%] hidden md:flex w-[40%] ">
          <img
            className="h-[100%]  w-[100%]"
            src="https://media-cdn.tripadvisor.com/media/photo-s/27/30/f6/37/welcome-to-cj-s-a-fully.jpg"
          />
        </div>
        <div
          className={` ${
            loading ? "opacity-60 pointer-events-none" : ""
          } flex relative py-20 md:py-0 px-4 flex-col w-full md:w-[60%]`}
        >
          <span className="text-3xl font-extrabold">
            WELCOME BACK, SIGN IN{" "}
          </span>
          <p className="my-4 text-sm">
            Sign in to your account and make recharges. payments and orders
            faster
          </p>
          <form onSubmit={RegisterForm} className="mx-auto w-[100%] md:w-[50%]">
            <div className="flex flex-col gap-5">
              <input
                type="email"
                required
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-6 py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
              />

              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                placeholder="Enter your Password"
                className="px-6 py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
              />
            </div>
            <div className="flex gap-2 my-4 ml-2">
              <input type="checkbox" />
              <label> Remember me </label>
            </div>

            {error && (
              <span className="mt-48">
                {Object.entries(error).map(([key, value]) => (
                  <div className="flex flex-col items-start w-full p-4 text-sm font-semibold text-red-700 border-l-2 border-red-700">
                    <ul className="flex flex-col">
                      <li> {value} </li>
                    </ul>
                  </div>
                ))}
              </span>
              // <div className="flex w-full p-4 my-2 mt-10 text-sm font-semibold text-red-700 border-l-2 border-red-700">
              //   {error.map((errorMessage, index) => (
              //     <div key={index}>{errorMessage}</div>
              //   ))}
              // </div>
            )}

            <button className={` ${formValid ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-25'} bg-primary rounded-full py-2 my-4 w-[100%]`}>
              {loading ? (
                <i className="text-green-600 fa fa-spinner fa-spin"></i>
              ) : (
                <span> Login </span>
              )}{" "}
            </button>
          </form>

          <span className="mt-10">
            {" "}
            Don’t have an account? <Link to="/register"> Sign up </Link>{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;

import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import config from "../Config";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { updateAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [newError, setNewError] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    // console.log(formData);
    if (
      formData.email.includes("@") &&
      formData.password.length > 6 &&
      formData.name &&
      formData.address
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      username: `${prevData.name.replace(/\s+/g, "")}_${
        prevData.email.split("@")[0]
      }`,
    }));
    setNewError([]);
  };

  const RegisterForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${config.appUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setNewError(responseData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLoading(false);
      // updateAuth(responseData);
      alert("Succesfully registered, now Login!");
      navigate("/login");
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
          {/* {loading && (
            <div className="absolute flex items-center justify-center w-full h-[450px] ">
              <i class="fa fa-2x fa-spinner fa-spin text-green-600"></i>
            </div>
          )} */}
          <span className="text-3xl font-extrabold">CREATE ACCOUNT</span>
          <p className="my-4 text-sm">
            Please Enter your Email Address to Start your Online Application
          </p>
          <form onSubmit={RegisterForm} className="mx-auto w-[100%] md:w-[50%]">
            <div className="flex gap-2 my-4">
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your name"
                className="px-6 w-[100%] py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
              />

              <input
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Your Telephone"
                className="px-6 w-[100%] py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
              />
            </div>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="px-6 w-[100%] my-2 py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
            />

            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="px-6 w-[100%] my-2 py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
            />
            <input
              required
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
              className="px-6 w-[100%] my-2 py-4 border rounded-3xl focus:outline-none focus:border-gray-400 focus:shadow-sm"
            />

            <div className="flex gap-2 my-4 ml-2">
              <input type="checkbox" />
              <label> Remember me </label>
            </div>

            {newError && (
              <span className="mt-48">
                {Object.entries(newError).map(([key, value]) => (
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
            {newError && <span></span>}
            <button
              className={` 
              } bg-primary font-semibold text-lg rounded-full py-2 my-4 w-[100%]`}
            >
              {loading ? (
                <i class="fa  fa-spinner fa-spin text-green-600"></i>
              ) : (
                <span> Register </span>
              )}{" "}
            </button>
          </form>

          <span className="mt-10">
            Have an account?{" "}
            <Link className="hover:text-primary" to="/login">
              {" "}
              Login{" "}
            </Link>{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;

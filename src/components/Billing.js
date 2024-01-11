import React, { useState, useContext, useEffect } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import config from '../Config';
import {AuthContext} from '../context/AuthContext';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CartActions } from "../store/cart/cart";

function Billing() {
  const dispatch = useDispatch();
  // const { totalAmount, cartItems } = useContext(CartContext);
  const {cartItems,  Total} = useSelector((state) => state.cart);
  // const {Auth} = useContext(AuthContext);
  const Auth = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const cities = [
    "Westminster",
    "Camden",
    "Islington",
    "Kensington and Chelsea",
    "Lambeth",
    "Southwark",
    "Tower Hamlets",
    "Hackney",
    "Hammersmith and Fulham",
    "Greenwich",
  ];

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const PostOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    const transformedCartItems = cartItems.map((item) => {
      return {
        item: item.productItem.id,
        selectedChoices: item.selectedChoices,
        quantity: item.quantity,
      }; // Assuming each item has an 'id' field
    });
    const _orderItem = {
      item: transformedCartItems,
      Name: name,
      email,
      address,
      total: Total,
      quantity: 100,
      user : Auth.user.id
    };

    console.log(JSON.stringify(_orderItem));
    
    try {
      const response = await fetch(`${config.appUrl}/api/order-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_orderItem),
      });
      // console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setLoading(false);
      dispatch(CartActions.clearCart())
      navigate('/order-success');
      // Handle the response data as needed
      console.log("Order placed successfully:", responseData);
    } catch (error) {
      console.error("Failed to place order:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={` ${loading ? 'opacity-20' : ''} relative flex flex-col-reverse justify-between px-4 pt-20 mx-auto mb-20 lg:flex-row max-w-7xl`}>
        {loading && (
          <div className="absolute flex items-center justify-center w-[100%] h-[450px] ">
            <i class="fa fa-2x fa-spinner fa-spin text-green-600"></i>
          </div>
        )}
        <div className="flex flex-col lg:w-[65%] text-start">
          <span className="font-bold lg:text-5xl"> Billing Details </span>
          <form onSubmit={PostOrder}>
            <div className="flex flex-col justify-between gap-5 my-10 lg:flex-row">
              <Input
                onChange={handleChange(setEmail)}
                type="email"
                placeholder="Your Email"
              />
              <Input
                onChange={handleChange(setName)}
                type="text"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col justify-between gap-5 my-10 lg:flex-row">
              <Input
                onChange={handleChange(setPhoneNumber)}
                type="text"
                placeholder="Your Phone Number"
              />
              <select
                onChange={handleChange(setCity)}
                className="px-6 py-2 border focus:outline-none w-[100%]"
              >
                <option> Choose </option>
                {cities.map((city) => (
                  <option className="font-bold text-primary"> {city} </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-between gap-5 my-10 lg:flex-row">
              <Input
                onChange={handleChange(setAddress)}
                type="text"
                width="true"
                placeholder="Address"
              />
            </div>

            <div className="flex justify-between gap-5 my-10">
              <textarea
                onChange={handleChange(setAdditionalInfo)}
                placeholder="Additional Information"
                className="px-6 resize-none py-2 border focus:outline-none w-[100%]"
              ></textarea>
            </div>
            <button className="lg:w-[25%] w-[100%]  rounded-full py-2 text-lg font-extrabold bg-primary">
              {" "}
              Place Order{" "}
            </button>
          </form>
        </div>

        <div className="flex flex-col w-auto text-start">
          <span className="font-bold lg:text-5xl"> Your Order </span>
          <div className="flex flex-col w-full my-10 text-center bg-secondary">
            <span className="mt-2 text-xl font-bold ">
              {" "}
              TOTAL CART ({cartItems.length}){" "}
            </span>

            <ul className="p-5">
              <li className="flex justify-between py-2 my-4 border-b border-gray-400 ">
                {" "}
                <span>Subtotal</span> <span> {Total} </span>{" "}
              </li>
              <li className="flex justify-between py-2 my-4 border-b border-gray-400 ">
                {" "}
                <span> Delivery </span> <span> $0 </span>{" "}
              </li>
              <li className="flex justify-between py-2 my-4 border-b border-gray-400 ">
                {" "}
                <span> Delivery </span> <span> $0 </span>{" "}
              </li>
              <li className="flex justify-between py-2 my-4 border-b border-gray-400 ">
                {" "}
                <span className="font-extrabold"> Total </span>{" "}
                <span className="font-extrabold"> {Total} </span>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;

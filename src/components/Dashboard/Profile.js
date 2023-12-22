import React, { Context, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { Auth } = useContext(AuthContext);

  const totalAmount = Auth.orders.reduce((accumulator, currentValue) => {
    // Ensure the "total" value is treated as a number
    return accumulator + parseFloat(currentValue.total);
  }, 0);

  return (
    <>
      <span className="mb-5 text-2xl font-bold"> Welcome To Your Profile </span>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-around gap-4 px-20 py-10 text-center rounded-2xl bg-login_bg">
          <i className="material-icons text-primary">hourglass_bottom</i>
          <span> 1 </span>
          <span className="font-medium"> Active Order </span>
        </div>
        <div className="flex flex-col justify-around gap-4 px-20 py-10 text-center rounded-2xl bg-login_bg">
          <i className="material-icons text-primary">check_circle</i>
          <span> 1 </span>
          <span className="font-medium"> Total Orders </span>
        </div>
        <div className="flex flex-col justify-around gap-4 px-20 py-10 text-center rounded-2xl bg-login_bg">
          <i className="material-icons text-primary">attach_money</i>

          <span>
            {" "}
            <p>
              Total Amount:{" "}
              {totalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>{" "}
          </span>
          <span className="font-medium"> Money Spent </span>
        </div>
      </div>

      <div className="flex flex-col w-auto p-5 mt-10 rounded-lg bg-login_bg">
        <div className="flex items-center justify-between">
          <span className="font-bold"> Personal Information </span>
          <button className="px-6 py-2 text-sm text-white bg-red-700 rounded-2xl">
            {" "}
            Edit{" "}
          </button>
        </div>

        <div className="flex w-[100%] lg:w-[50%] justify-between mt-10">
          <ul className="flex flex-col gap-4">
            <li> Name </li>
            <li> Email </li>
            <li> Phone </li>
            <li> Address </li>
          </ul>

          <ul className="flex flex-col gap-4">
            <li> {Auth.user.name} </li>
            <li> {Auth.user.email} </li>
            <li> +{Auth.user.telephone} </li>
            <li> {Auth.user.address} </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;

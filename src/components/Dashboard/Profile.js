import React, { Context, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import config from "../../Config";
import { useDispatch } from "react-redux";

import { AuthActions } from "../../store/auth/auth";
function Profile() {
  // const { Auth } = useContext(AuthContext);
  const Auth = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState({});
  const [updateUser, setUpdateUser] = useState(false);
  const [updating, SetUpdating] = useState({
    Loading: false,
    message: "Save",
  });
  let form = null;

  const totalAmount = Auth.orders.reduce((accumulator, currentValue) => {
    // Ensure the "total" value is treated as a number
    return accumulator + parseFloat(currentValue.total);
  }, 0);

  useEffect(() => {
    if (Auth) {
      setUserData({
        name: Auth.user.name,
        email: Auth.user.email,
        telephone: Auth.user.telephone,
        address: Auth.user.address,
      });
      form = Object.keys(UserData);
    }
    console.log(UserData);
  }, [Auth]);

  const handleEditUserDetails = (property, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [property]: value,
    }));
  };

  const updateUserDetails = async () => {
    SetUpdating({
      Loading: true,
      message: "updating..",
    });

    console.log(JSON.stringify(UserData));

    console.log(UserData.address);
    try {
      const response = await fetch(
        `${config.appUrl}/api/users/${Auth.user.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Auth.token}`,
          },
          body: JSON.stringify(UserData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        if (response.status === 401) {
          console.log(responseData);
        } else {
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      const _data = {
        ...Auth,
        user: {
          ...Auth.user,
          email: UserData.email,
          name: UserData.name,
          telephone: UserData.telephone,
          address: UserData.address,
        },
      };
      console.log(_data);

      dispatch(AuthActions.initialLogin(_data));
      localStorage.setItem("auth", JSON.stringify(_data));
      SetUpdating({
        Loading: true,
        message: "saving...",
      });

      setTimeout(() => {
        SetUpdating({
          Loading: false,
          message: "Save",
        });
        setUpdateUser(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      SetUpdating({
        Loading: false,
        message: "Something went wrong..",
      });
      setTimeout(() => {
        setUpdateUser(false);
        SetUpdating({
          Loading: false,
          message: "save",
        });
      }, 2000);
    }
  };

  return (
    <>
      <span className="mb-5 text-2xl font-bold"> Welcome To Your Profile </span>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-around gap-4 px-20 py-10 text-center rounded-2xl bg-login_bg">
          <i className="material-icons text-primary">hourglass_bottom</i>
          <span> 1 </span>
          <span className="font-medium"> Active </span>
        </div>
        <div className="flex flex-col justify-around gap-4 px-20 py-10 text-center rounded-2xl bg-login_bg">
          <i className="material-icons text-primary">check_circle</i>
          <span> {Auth.orders.length} </span>
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
          {updateUser ? (
            <button
              onClick={() => updateUserDetails()}
              className="px-6 py-2 text-sm text-white bg-green-700 rounded-2xl"
            >
              {updating.message}
            </button>
          ) : (
            <button
              onClick={() => setUpdateUser((val) => !val)}
              className="px-6 py-2 text-sm text-white bg-red-700 rounded-2xl"
            >
              {" "}
              Edit{" "}
            </button>
          )}

          {/* <button
            onClick={() =>
              updateUser ? updateUserDetails() : setUpdateUser((val) => !val)
            }
            className={` ${
              updateUser ? "bg-green-600" : "bg-red-700"
            } px-6 py-2 text-sm text-white rounded-2xl`}
          >
            {updateUser ? "Save" : "Edit"}
          </button> */}
        </div>

        <div className="flex w-[100%] lg:w-[50%] justify-between  mt-10">
          <ul className="flex flex-col w-full gap-4 ">
            {/* {form.map((key) => (
              <input key={key} type="text" value={UserData[key]} />
            ))} */}
            {Object.keys(UserData).map((key) => (
              <div className="flex justify-between w-full">
                <span> {key} </span>
                <span>
                  {updateUser ? (
                    <input
                      onChange={(e) =>
                        handleEditUserDetails(key, e.target.value)
                      }
                      type="text"
                      value={UserData[key]}
                      className="p-2 border"
                    />
                  ) : (
                    <li> {UserData[key] ? UserData[key] : "-"} </li>
                  )}
                </span>
              </div>
            ))}

            {Object.keys(UserData).forEach((key) => (
              <li> g </li>
            ))}
            {/* {updateUser ? (
              <input
                type="text"
                value={Auth.user.name}
                className="p-2 border"
              />
            ) : (
              <li> {Auth.user.name} </li>
            )}
            {updateUser ? (
              <input
                type="email"
                value={Auth.user.email}
                className="p-2 border"
              />
            ) : (
              <li> {Auth.user.email} </li>
            )}
            {updateUser ? (
              <input
                type="text"
                value={Auth.user.telephone}
                className="p-2 border"
              />
            ) : (
              <li> {Auth.user.telephone} </li>
            )}
            {updateUser ? (
              <input
                type="text"
                value={Auth.user.address}
                className="p-2 border"
              />
            ) : (
              <li> {Auth.user.address} </li>
            )} */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;

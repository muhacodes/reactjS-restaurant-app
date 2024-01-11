import React, { Context, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

function Order() {
  // const { Auth } = useContext(AuthContext);
  const Auth = useSelector((state) => state.auth.userData)
  return (
    <>
      <span className="mb-4 text-3xl font-bold "> Order </span>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full border text-center text-sm font-light">
              <thead class=" bg-red-800 font-mediumn text-white dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" class="text-white px-6 py-4">
                    #
                  </th>
                  <th scope="col" class="text-white px-6 py-4">
                    Date
                  </th>
                  <th scope="col" class="text-white px-6 py-4">
                    Items
                  </th>
                  <th scope="col" class="text-white px-6 py-4">
                    Amount
                  </th>
                  <th scope="col" class="text-white px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Auth.orders?.map((order) => (
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                      {" "}
                      {order.id}{" "}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {/* Format the date */}
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                      })}   - - 
                      {/* Add space */} {/* Format the time */}
                      {new Date(order.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {" "}
                      {order.item.length}{" "}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {" "}
                      {order.total}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;

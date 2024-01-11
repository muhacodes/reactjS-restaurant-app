import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartActions } from "../store/cart/cart";

function CartGrid() {
  // const { cartItems, removeItemFromCart, incrementQuantity, totalAmount } =
  //   useContext(CartContext);

  const dispatch = useDispatch();
  // const { cartItems, Total } = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const Total = useSelector((state) => state.cart.Total);
  const [loading, setLoading] = useState(false);
  // console.log('hey there')
  // console.log(cartItems);

  return (
    <>
      <div className="relative items-start py-20 mx-auto text-start max-w-7xl">
        <div className="relative mb-20 overflow-x-auto shadow-sm lg:overflow-hidden sm:rounded-lg">
          <table class="min-w-full text-left   text-sm font-light">
            <thead class=" bg-secondary font-mediumn text-white dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th
                  scope="col"
                  class="hidden lg:table-cell text-white px-6 py-4"
                >
                  #
                </th>
                <th scope="col" class="text-black font-bold lg:text-lg px-6 py-4">
                  ProductDetails
                </th>
                <th scope="col" class="text-black font-bold lg:text-lg px-6 py-4">
                  Price
                </th>
                <th scope="col" class="text-black font-bold lg:text-lg px-6 py-4">
                  Quantity
                </th>
                <th scope="col" class="text-black font-bold lg:text-lg px-6 py-4">
                  Subtotal
                </th>
                <th scope="col" class="text-black font-bold lg:text-lg px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="hidden px-6 py-4 font-medium text-gray-900 align-middle lg:table-cell whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="h-[120px] lg:w-[50%] w-[100%]"
                      src={item.productItem.image_url}
                    />
                  </td>
                  <td className="px-6 text-left w-[25rem] lg:w-full  py-4 flex flex-col align-middle">
                    <span className="text-sm font-medium tracking-tighter lg:text-base">
                      {item.productItem.title}
                    </span>
                    {item.selectedChoices &&
                      item.selectedChoices.map((choice, choiceIndex) => (
                        <span
                          className="tracking-tighter text-gray-400"
                          key={choiceIndex}
                        >
                          {" "}
                          {choice.option}{" "}
                          {choice.price > 0 ? `@$${choice.price}` : ""}{" "}
                        </span>
                      ))}{" "}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    {" "}
                    {item.productItem.price}{" "}
                  </td>
                  <td className="px-6 py-4 align-middle"> {item.quantity} </td>
                  <td className="px-6 py-4 align-middle"> {item.subtotal} </td>
                  <td className="px-6 py-4 align-middle">
                    <i
                      onClick={() => dispatch(CartActions.removeCartItem(item))}
                      className="cursor-pointer fa fa-times text-primary"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <table
            id="cart_table"
            className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400"
          >
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center"> Product Details </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Price</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Quantity</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Subtotal</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center"> Action </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="hidden px-6 py-4 font-medium text-gray-900 align-middle lg:table-cell whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="h-[120px] lg:w-[50%] w-[100%]"
                      src={item.productItem.image_url}
                    />
                  </td>
                  <td className="px-6 w-[25rem] lg:w-full bg-red-50 py-4 flex flex-col align-middle">
                    <span className="text-sm font-medium tracking-tighter lg:text-base">
                      {item.productItem.title}
                    </span>
                    {item.selectedChoices &&
                      item.selectedChoices.map((choice, choiceIndex) => (
                        <span
                          className="tracking-tighter text-gray-400"
                          key={choiceIndex}
                        >
                          {" "}
                          {choice.option}{" "}
                          {choice.price > 0 ? `@$${choice.price}` : ""}{" "}
                        </span>
                      ))}{" "}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    {" "}
                    {item.productItem.price}{" "}
                  </td>
                  <td className="px-6 py-4 align-middle"> {item.quantity} </td>
                  <td className="px-6 py-4 align-middle"> {item.subtotal} </td>
                  <td className="px-6 py-4 align-middle">
                    <i
                      onClick={() => removeItemFromCart(item)}
                      className="cursor-pointer fa fa-times text-primary"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>

        <div className="flex items-end w-full lg:justify-end">
          <div className="flex flex-col w-full lg:w-[30%] text-center bg-secondary">
            <span className="m-4 text-xl font-bold "> TOTAL CART (02) </span>

            <ul className="p-5">
              <li className="flex justify-between w-full my-2">
                {" "}
                <span>Subtotal</span> <span> {Total} </span>{" "}
              </li>
              <li className="flex justify-between my-2">
                {" "}
                <span> Delivery </span> <span> $0 </span>{" "}
              </li>
            </ul>
            <Link
              className="p-4 font-bold text-black bg-primary"
              to="/checkout"
            >
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartGrid;

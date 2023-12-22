import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const deserializedCartItems = JSON.parse(savedCartItems);
      setCartItems(deserializedCartItems);
    }
    
  }, []);

  useEffect(() => {
    const serializedCartItems = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", serializedCartItems);

    // Calculate the total amount whenever cartItems changes
    const newTotalAmount = cartItems.reduce((total, item) => {
      return total + (item.subtotal || 0);
    }, 0);
    setTotalAmount(newTotalAmount);

  }, [cartItems]);

  const addItemToCart = (item) => {
    // alert('addog');
    // if(cartItems.length ===0){
    //   setCartItems(item);
    // }else{
    //   setCartItems([...cartItems, item]);
    // }

    setCartItems((currentItems) => [...currentItems, item]);
    
  };

  const removeItemFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const incrementQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        // Calculate the total price of selected choices
        const totalChoicesPrice = cartItem.selectedChoices.reduce(
          (total, choice) => {
            return total + Number(choice.price || 0);
          },
          0
        );

        // Ensure product price is a number and increment quantity
        const productPrice = Number(cartItem.productItem.price) || 0;
        const quantity = Number(cartItem.quantity) + 1;

        // Calculate the new subtotal
        const subtotal = quantity * (productPrice + totalChoicesPrice);

        return {
          ...cartItem,
          quantity: quantity,
          subtotal: subtotal,
        };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (item) => {};

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

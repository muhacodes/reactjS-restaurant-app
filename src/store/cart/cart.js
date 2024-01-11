import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "cart",
  initialState: { cartItems: [], Total: 0, changed: false },
  reducers: {
    addItemToCart: (state, actions) => {
      // if(actions.payload.changed){
      //   state.changed = true;
      // }
      const newData = Array.isArray(actions.payload)
        ? actions.payload
        : [actions.payload];

      // Append the new data to the existing cartItems array
      state.cartItems = [...state.cartItems, ...newData];

      // Recalculate Total based on the updated cartItems
      state.Total = state.cartItems?.reduce((total, item) => {
        return total + (item.subtotal || 0);
      }, 0);
    },
    removeCartItem: (state, actions) => {
      const cartItem = actions.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== cartItem.id
      );
    },
    incrementQuantity: (state, actions) => {},
    clearCart : (state, actions) => {
      state.cartItems = [];
      state.Total = 0;
    }
  },
});

export const CartActions = Cart.actions;
export default Cart.reducer;

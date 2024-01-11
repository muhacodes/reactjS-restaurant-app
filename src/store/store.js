import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/auth';
import cart from './cart/cart';

const store = configureStore({
  reducer: {
    auth,
    cart,
  },
});

export default store;
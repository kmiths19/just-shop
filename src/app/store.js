import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartRedcuser from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartRedcuser,
    order: orderReducer,
    user: userReducer,
  },
});

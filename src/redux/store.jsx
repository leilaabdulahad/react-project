import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import registerReducer from '../slices/registerSlice';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';
import orderHistoryReducer from '../slices/orderHistorySlice';
import ordersReducer from '../slices/ordersSlice';

//Central place for all reducers, so we can import them in any component
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    user: userReducer,
    auth: authReducer,
    orders: ordersReducer,
    orderHistory: orderHistoryReducer, 
   
  },
});
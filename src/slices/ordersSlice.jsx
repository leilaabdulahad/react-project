import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const response = await axios.get(`https://js2-ecommerce-api.vercel.app/api/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        selectedOrder: null, 
        status: 'idle', 
        error: null,
    },
    reducers: {
        clearSelectedOrder: state => {
            state.selectedOrder = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderById.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.selectedOrder = action.payload;
            console.log('Selected order:', state.selectedOrder); 
        })
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
})
export const { clearSelectedOrder } = ordersSlice.actions;
export const selectSelectedOrder = (state) => state.orders.selectedOrder; 
export const { } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
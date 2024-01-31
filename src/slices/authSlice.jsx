import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch orders
export const fetchOrders = createAsyncThunk('auth/fetchOrders', async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const response = await axios.get('https://js2-ecommerce-api.vercel.app/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null,
        orders: [],
        error: null,
    },
    reducers: {
        login: (state, action) => {
            console.log('Login action triggered');
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            console.log('logout reducer called');
            state.isAuthenticated = false;
            state.token = null;
            state.orders = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectOrders = (state) => state.auth.orders;

export default authSlice.reducer;
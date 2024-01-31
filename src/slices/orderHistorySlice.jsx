import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = createAsyncThunk('orderHistory/fetchOrder', async (id, thunkAPI) => {
    console.log('Fetching order with ID:', id);
    const { token } = thunkAPI.getState().auth;
    try {
        const response = await axios.get(`https://js2-ecommerce-api.vercel.app/api/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'An error occurred');
    }
});

export const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: {
        order: null,
        id: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        selectOrder: (state, action) => {
            state.id = action.payload; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.id = action.payload._id; 
                state.status = 'succeeded';
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; 
            });
    },
});

export const { selectOrder } = orderHistorySlice.actions; 
export const selectId = (state) => state.orderHistory.id; 

export const selectOrderState = createSelector(
    state => state.orderHistory.order,
    order => order
   );

export default orderHistorySlice.reducer;

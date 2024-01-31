import { createSlice } from '@reduxjs/toolkit';

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    purchaseStatus: 'idle',
    error: null,
    orders: [], 
  },
  reducers: {
    purchaseStart: (state) => {
      console.log('purchaseStart reducer called');
      state.purchaseStatus = 'loading';
      state.error = null;
    },
    purchaseSuccess: (state) => {
      state.purchaseStatus = 'succeeded';
    },
    purchaseFailure: (state, action) => {
      state.purchaseStatus = 'failed';
      state.error = action.payload;
    },
    resetPurchase: (state) => {
      state.purchaseStatus = 'idle';
      state.error = null;
    },
  },
});

export const { purchaseStart, purchaseSuccess, purchaseFailure, resetPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
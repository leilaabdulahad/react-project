import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    purchasedItems: [], //Adds a new state for purchased items
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // Item exists in cart, increment quantity
        state.items[itemIndex].quantity++;
      } else {
        // Item does not exist in cart, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload._id)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload._id)
      if (item && item.quantity > 1) {
        item.quantity --
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    purchase: (state) => {
      state.purchasedItems = state.items; 
      state.items = []; //Clears the cart
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, purchase } = cartSlice.actions;

//Adds a selector to get the items in the cart
export const selectCartItems = (state) => state.cart.items;

//Adds a selector to get the purchased items
export const selectPurchasedItems = (state) => state.cart.purchasedItems;

//Adds a selector to get the total number of items in the cart
export const selectCartItemsCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

//Adds a selector to get the total price of the items in the cart
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export default cartSlice.reducer;
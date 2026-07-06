import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // items keyed by product id => { ...product, quantity }
    items: {},
  },
  reducers: {
    // Increment quantity (adds product to cart if not present)
    incrementItem: (state, action) => {
      const product = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
    },
    // Decrement quantity (removes from cart if it hits 0)
    decrementItem: (state, action) => {
      const productId = action.payload;
      const existing = state.items[productId];
      if (!existing) return;
      if (existing.quantity <= 1) {
        delete state.items[productId];
      } else {
        existing.quantity -= 1;
      }
    },
    // Remove item entirely regardless of quantity
    removeItem: (state, action) => {
      const productId = action.payload;
      delete state.items[productId];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { 
  incrementItem, 
  decrementItem, 
  removeItem, 
  clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsArray = (state) => Object.values(state.cart.items);
export const selectCartQuantityForProduct = (productId) => (state) =>
  state.cart.items[productId]?.quantity || 0;
export const selectCartTotalCount = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

export default cartSlice.reducer;
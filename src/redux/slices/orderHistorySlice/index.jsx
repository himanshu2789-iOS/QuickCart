import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    clearOrderHistory: state => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrderHistory } =
  orderHistorySlice.actions;

export const selectOrders = state =>
  state.orderHistory.orders;

export default orderHistorySlice.reducer;
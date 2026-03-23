import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from './data'

interface OrderState {
  orders: Order[]
}

const initialState: OrderState = {
  orders: [],
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload)
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex((o) => o.key === action.payload.key)
      if (index !== -1) state.orders[index] = action.payload
    },
    removeOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((o) => o.key !== action.payload)
    },
  },
})

export const { setOrders, addOrder, updateOrder, removeOrder } = orderSlice.actions
export default orderSlice.reducer

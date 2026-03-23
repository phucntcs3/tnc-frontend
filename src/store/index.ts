import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import accountReducer from '../features/accounts/accountSlice'
import clientReducer from '../features/clients/clientSlice'
import orderReducer from '../features/orders/orderSlice'
import userReducer from '../features/users/userSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    clients: clientReducer,
    orders: orderReducer,
    users: userReducer,
    dashboard: dashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

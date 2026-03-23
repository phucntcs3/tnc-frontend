import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface RecentOrder {
  key: string
  orderId: string
  customer: string
  total: number
  status: string
  date: string
}

export interface ClientStat {
  type: string
  value: number
}

interface DashboardState {
  recentOrders: RecentOrder[]
  clientStats: ClientStat[]
}

const initialState: DashboardState = {
  recentOrders: [],
  clientStats: [],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setRecentOrders(state, action: PayloadAction<RecentOrder[]>) {
      state.recentOrders = action.payload
    },
    setClientStats(state, action: PayloadAction<ClientStat[]>) {
      state.clientStats = action.payload
    },
  },
})

export const { setRecentOrders, setClientStats } = dashboardSlice.actions
export default dashboardSlice.reducer

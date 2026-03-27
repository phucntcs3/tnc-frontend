import axiosClient from '@/api/axiosClient'

export const getDashboardStats = () => axiosClient.get('/dashboard/stats')

export const getRecentOrders = () => axiosClient.get('/dashboard/recent-orders')

import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getRecentOrders } from '../api/dashboardApi'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => getDashboardStats().then((res: { data: unknown }) => res.data),
  })
}

export const useRecentOrders = () => {
  return useQuery({
    queryKey: ['dashboard', 'recent-orders'],
    queryFn: () => getRecentOrders().then((res: { data: unknown }) => res.data),
  })
}

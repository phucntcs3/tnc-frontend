import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/orderApi'

export const useOrders = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrders(params).then((res) => res.data),
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      updateOrder(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })
}

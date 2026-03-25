import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrders, createOrder, updateOrder, deleteOrder, type OrderResponse } from '../api/orderApi'
import type { Order } from '../data'

const mapOrder = (o: OrderResponse): Order => ({
  key: String(o.id),
  id: o.id,
  date: o.date.split('T')[0],
  webPo: o.web_po,
  amount: parseFloat(o.amount),
  exchangeRate: parseFloat(o.exchange_rate),
  taskNo: o.task_no,
  deadlineAt: o.deadline_at,
  deadlineNote: o.deadline_note,
  note: o.note,
  cost: parseFloat(o.cost),
  client: o.client,
  pm: o.pm,
  invoiceStatus: o.invoice_status,
  service: o.service,
  field: o.field,
  orderStatus: o.order_status,
  deliveryStatus: o.delivery_status,
  paymentStatus: o.payment_status,
  account: o.account,
  user: o.user,
})

export const useOrders = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrders(params).then((res) => res.data.data.map(mapOrder)),
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

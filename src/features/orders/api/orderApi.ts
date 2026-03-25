import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

interface NamedEntityResponse {
  id: number
  name: string
}

interface UserEntityResponse {
  id: number
  email: string
}

export interface OrderResponse {
  id: number
  date: string
  web_po: string | null
  amount: string
  exchange_rate: string
  task_no: string | null
  deadline_at: string | null
  deadline_note: string | null
  note: string | null
  cost: string
  client: NamedEntityResponse | null
  pm: NamedEntityResponse | null
  invoice_status: NamedEntityResponse | null
  service: NamedEntityResponse | null
  field: NamedEntityResponse | null
  order_status: NamedEntityResponse | null
  delivery_status: NamedEntityResponse | null
  payment_status: NamedEntityResponse | null
  account: NamedEntityResponse | null
  user: UserEntityResponse | null
}

export const getOrders = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: OrderResponse[] }>(ENDPOINTS.ORDERS, { params })
}

export const createOrder = (data: Record<string, unknown>) => {
  return axiosClient.post(ENDPOINTS.ORDERS, data)
}

export const updateOrder = (id: number, data: Record<string, unknown>) => {
  return axiosClient.put(ENDPOINTS.ORDER_BY_ID(id), data)
}

export const deleteOrder = (id: number) => {
  return axiosClient.delete(ENDPOINTS.ORDER_BY_ID(id))
}

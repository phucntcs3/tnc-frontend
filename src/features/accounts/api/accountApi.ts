import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface AccountResponse {
  id: number
  name: string
  description: string | null
  note: string | null
  user_id: number
  is_active: number
  created_at: string
  updated_at: string
}

export const getAccounts = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: AccountResponse[] }>(ENDPOINTS.ACCOUNTS, { params })
}

export const createAccount = (data: { name: string; description?: string; note?: string }) => {
  return axiosClient.post(ENDPOINTS.ACCOUNTS, data)
}

export const updateAccount = (id: number, data: Partial<{ name: string; description: string; note: string }>) => {
  return axiosClient.put(ENDPOINTS.ACCOUNT_BY_ID(id), data)
}

export const deleteAccount = (id: number) => {
  return axiosClient.delete(ENDPOINTS.ACCOUNT_BY_ID(id))
}

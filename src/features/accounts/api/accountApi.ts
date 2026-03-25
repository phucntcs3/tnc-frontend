import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface AccountUserResponse {
  id: number
  email: string
  is_active: number
  role_id: number
}

export interface AccountResponse {
  id: number
  name: string
  description: string | null
  note: string | null
  is_active: number
  created_at: string
  updated_at: string
  users: AccountUserResponse[]
}

export const getAccounts = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: AccountResponse[] }>(ENDPOINTS.ACCOUNTS, { params })
}

export interface AccountPayload {
  name: string
  description?: string
  note?: string
  userIds?: number[]
}

const toSnakeCase = (data: Partial<AccountPayload>) => ({
  name: data.name,
  description: data.description,
  note: data.note,
  user_id: data.userIds,
})

export const createAccount = (data: AccountPayload) => {
  return axiosClient.post(ENDPOINTS.ACCOUNTS, toSnakeCase(data))
}

export const updateAccount = (id: number, data: Partial<AccountPayload>) => {
  return axiosClient.put(ENDPOINTS.ACCOUNT_BY_ID(id), toSnakeCase(data))
}

export const deleteAccount = (id: number) => {
  return axiosClient.delete(ENDPOINTS.ACCOUNT_BY_ID(id))
}

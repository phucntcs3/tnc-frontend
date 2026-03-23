import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface UserResponse {
  id: number
  email: string
  is_active: number
  is_first_login: number
  role_id: number
  account_id: number | null
  created_at: string
}

export const getUsers = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: UserResponse[] }>(ENDPOINTS.USERS, { params })
}

export const createUser = (data: { email: string; roleId: number }) => {
  return axiosClient.post(ENDPOINTS.USERS, data)
}

export const updateUser = (id: number, data: { email?: string; roleId?: number }) => {
  return axiosClient.put(ENDPOINTS.USER_BY_ID(id), data)
}

export const deleteUser = (id: number) => {
  return axiosClient.delete(ENDPOINTS.USER_BY_ID(id))
}

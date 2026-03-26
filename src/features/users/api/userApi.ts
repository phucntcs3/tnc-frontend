import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface UserAccountResponse {
  id: number
  name: string
  description: string | null
  note: string | null
  is_active: number
}

export interface UserResponse {
  id: number
  email: string
  is_active: number
  is_first_login: number
  role_id: number
  created_at: string
  accounts: UserAccountResponse[]
}

export const getUsers = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: UserResponse[] }>(ENDPOINTS.USERS, { params })
}

export const getAssignees = () => {
  return axiosClient.get<{ success: boolean; data: UserResponse[] }>(ENDPOINTS.ASSIGNEES)
}

export interface UserPayload {
  email: string
  roleId: number
  accountIds?: number[]
}

const toSnakeCase = (data: Partial<UserPayload>) => ({
  email: data.email,
  role_id: data.roleId,
  account_ids: data.accountIds,
})

export const createUser = (data: UserPayload) => {
  return axiosClient.post(ENDPOINTS.USERS, toSnakeCase(data))
}

export const updateUser = (id: number, data: Partial<UserPayload>) => {
  return axiosClient.put(ENDPOINTS.USER_BY_ID(id), toSnakeCase(data))
}

export const deleteUser = (id: number) => {
  return axiosClient.delete(ENDPOINTS.USER_BY_ID(id))
}

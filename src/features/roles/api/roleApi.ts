import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface RoleResponse {
  id: number
  name: string
  description: string | null
  note: string | null
  created_at: string
}

export const getRoles = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: RoleResponse[] }>(ENDPOINTS.ROLES, { params })
}

export const createRole = (data: { name: string; description?: string; note?: string }) => {
  return axiosClient.post(ENDPOINTS.ROLES, data)
}

export const updateRole = (id: number, data: Partial<{ name: string; description: string; note: string }>) => {
  return axiosClient.put(`${ENDPOINTS.ROLES}/${id}`, data)
}

export const deleteRole = (id: number) => {
  return axiosClient.delete(`${ENDPOINTS.ROLES}/${id}`)
}

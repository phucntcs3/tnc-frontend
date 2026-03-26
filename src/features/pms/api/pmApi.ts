import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface PMResponse {
  id: number
  name: string
  client_id: number | null
  description: string | null
  note: string | null
  is_active: number
}

export interface PMPayload {
  name: string
  client_id?: number | null
  description?: string
  note?: string
}

export const getPMs = () => {
  return axiosClient.get<{ success: boolean; data: PMResponse[] }>(ENDPOINTS.PMS)
}

export const createPM = (data: PMPayload) => {
  return axiosClient.post(ENDPOINTS.PMS, data)
}

export const updatePM = (id: number, data: Partial<PMPayload>) => {
  return axiosClient.put(ENDPOINTS.PM_BY_ID(id), data)
}

export const deletePM = (id: number) => {
  return axiosClient.delete(ENDPOINTS.PM_BY_ID(id))
}

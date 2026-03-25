import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axiosClient.post(ENDPOINTS.AUTH_LOGIN, payload)
  return data
}

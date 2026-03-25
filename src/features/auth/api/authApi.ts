import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginData {
  access_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    is_active: number
    is_first_login: number
    role_id: number
    created_at: string
  }
}

export interface LoginResponse {
  success: boolean
  message?: string
  data: LoginData
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axiosClient.post(ENDPOINTS.AUTH_LOGIN, payload)
  return data
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  new_password: string
}

export interface AuthMessageResponse {
  success: boolean
  message: string
}

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await axiosClient.post(
    ENDPOINTS.AUTH_FORGOT_PASSWORD,
    payload,
  )
  return data
}

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await axiosClient.post(
    ENDPOINTS.AUTH_RESET_PASSWORD,
    payload,
  )
  return data
}

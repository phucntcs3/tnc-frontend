import { useMutation } from '@tanstack/react-query'
import {
  login,
  forgotPassword,
  resetPassword,
  type LoginPayload,
  type LoginResponse,
  type ForgotPasswordPayload,
  type ResetPasswordPayload,
  type AuthMessageResponse,
} from '../api/authApi'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
  })
}

export const useForgotPassword = () => {
  return useMutation<AuthMessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: forgotPassword,
  })
}

export const useResetPassword = () => {
  return useMutation<AuthMessageResponse, Error, ResetPasswordPayload>({
    mutationFn: resetPassword,
  })
}

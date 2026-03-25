import { useMutation } from '@tanstack/react-query'
import { login, type LoginPayload, type LoginResponse } from '../api/authApi'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
  })
}

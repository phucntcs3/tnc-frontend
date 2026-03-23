import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../api/accountApi'

export const useAccounts = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => getAccounts(params).then((res) => res.data),
  })
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      updateAccount(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

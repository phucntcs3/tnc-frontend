import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAccounts, createAccount, updateAccount, deleteAccount, type AccountResponse, type AccountPayload } from '../api/accountApi'
import type { Account } from '../data'

const mapAccount = (a: AccountResponse): Account => ({
  key: String(a.id),
  id: a.id,
  name: a.name,
  description: a.description,
  note: a.note,
  isActive: a.is_active === 1,
  createdAt: a.created_at.split('T')[0],
  updatedAt: a.updated_at.split('T')[0],
  users: a.users.map((u) => ({
    id: u.id,
    email: u.email,
    isActive: u.is_active === 1,
    roleId: u.role_id,
  })),
})

export const useAccounts = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => getAccounts(params).then((res) => res.data.data.map(mapAccount)),
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
    mutationFn: ({ id, data }: { id: number; data: Partial<AccountPayload> }) =>
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

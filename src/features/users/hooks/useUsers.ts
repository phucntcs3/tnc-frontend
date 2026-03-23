import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, createUser, updateUser, deleteUser, type UserResponse } from '../api/userApi'
import type { User } from '../data'
import { roleOptions } from '../data'

const mapUser = (u: UserResponse): User => ({
  key: String(u.id),
  id: u.id,
  email: u.email,
  isActive: u.is_active === 1,
  isFirstLogin: u.is_first_login === 1,
  roleId: u.role_id,
  roleName: roleOptions.find((r) => r.value === u.role_id)?.label ?? '',
  accountId: u.account_id,
  createdAt: u.created_at.split('T')[0],
})

export const useUsers = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params).then((res) => res.data.data.map(mapUser)),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { email?: string; roleId?: number } }) =>
      updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

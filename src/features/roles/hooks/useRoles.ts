import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRoles, createRole, updateRole, deleteRole, type RoleResponse } from '../api/roleApi'
import type { Role } from '../data'

const mapRole = (r: RoleResponse): Role => ({
  key: String(r.id),
  id: r.id,
  name: r.name,
  code: r.code,
  description: r.description,
  note: r.note,
  createdAt: r.created_at.split('T')[0],
})

export const useRoles = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => getRoles(params).then((res) => res.data.data.map(mapRole)),
  })
}

export const useCreateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  })
}

export const useUpdateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<{ name: string; code: string; description: string; note: string }> }) =>
      updateRole(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  })
}

export const useDeleteRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  })
}

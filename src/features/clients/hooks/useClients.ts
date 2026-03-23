import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, createClient, updateClient, deleteClient } from '../api/clientApi'

export const useClients = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['clients', params],
    queryFn: () => getClients(params).then((res) => res.data),
  })
}

export const useCreateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      updateClient(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPMs, createPM, updatePM, deletePM, type PMResponse, type PMPayload } from '../api/pmApi'
import type { PM } from '../data'

const mapPM = (p: PMResponse): PM => ({
  key: String(p.id),
  id: p.id,
  name: p.name,
  clientId: p.client_id,
  description: p.description,
  note: p.note,
  isActive: p.is_active === 1,
})

export const usePMs = () => {
  return useQuery({
    queryKey: ['pms'],
    queryFn: () => getPMs().then((res) => res.data.data.map(mapPM)),
  })
}

export const useCreatePM = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPM,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pms'] }),
  })
}

export const useUpdatePM = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PMPayload> }) =>
      updatePM(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pms'] }),
  })
}

export const useDeletePM = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePM,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pms'] }),
  })
}

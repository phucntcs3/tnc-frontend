import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, createClient, updateClient, deleteClient, type ClientResponse, type RateResponse } from '../api/clientApi'
import type { Client, Rate } from '../data'

const mapRate = (r: RateResponse): Rate => ({
  id: r.id,
  amount: r.amount,
  minAmount: r.min_amount,
  note: r.note,
  sourceLang: r.source_lang,
  targetLang: r.target_lang,
  serviceType: r.service_type,
  unit: r.unit,
  currency: r.currency,
  account: r.account,
  sale: r.sale,
})

const mapClient = (c: ClientResponse): Client => ({
  key: String(c.id),
  id: c.id,
  name: c.name,
  description: c.description,
  note: c.note,
  isActive: c.is_active === 1,
  location: c.location,
  website: c.website,
  email: c.email,
  paymentTerms: c.payment_terms,
  establishedAt: c.established_at,
  createdAt: c.created_at.split('T')[0],
  rates: (c.rates || []).map(mapRate),
})

export const useClients = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['clients', params],
    queryFn: () => getClients(params).then((res) => res.data.data.map(mapClient)),
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

import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface RateResponse {
  id: number
  amount: string
  min_amount: string
  note: string | null
  source_lang: string | null
  target_lang: string | null
  service_type: { id: number; name: string; code: string }
  unit: { id: number; name: string }
  currency: { id: number; name: string; code: string }
  account: { id: number; name: string } | null
  sale: { id: number; email: string } | null
}

export interface ClientResponse {
  id: number
  name: string
  description: string | null
  note: string | null
  is_active: number
  location: string | null
  website: string | null
  email: string | null
  payment_terms: number | null
  established_at: string | null
  created_at: string
  rates: RateResponse[]
}

export interface ClientPayload {
  name: string
  description?: string
  note?: string
  location?: string
  website?: string
  email?: string
  paymentTerms?: number
  establishedAt?: string
}

const toSnakeCase = (data: Partial<ClientPayload>) => ({
  name: data.name,
  description: data.description,
  note: data.note,
  location: data.location,
  website: data.website,
  email: data.email,
  payment_terms: data.paymentTerms,
  established_at: data.establishedAt,
})

export const getClients = (params?: Record<string, unknown>) => {
  return axiosClient.get<{ success: boolean; data: ClientResponse[] }>(ENDPOINTS.CLIENTS, { params })
}

export const createClient = (data: ClientPayload) => {
  return axiosClient.post(ENDPOINTS.CLIENTS, toSnakeCase(data))
}

export const updateClient = (id: number, data: Partial<ClientPayload>) => {
  return axiosClient.put(ENDPOINTS.CLIENT_BY_ID(id), toSnakeCase(data))
}

export const deleteClient = (id: number) => {
  return axiosClient.delete(ENDPOINTS.CLIENT_BY_ID(id))
}

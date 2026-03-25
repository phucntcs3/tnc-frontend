import axiosClient from '@/api/axiosClient'
import { ENDPOINTS } from '@/api/endpoints'

export interface MetadataItem {
  id: number
  name: string
}

export const getOrderStatuses = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_ORDER_STATUSES)

export const getDeliveryStatuses = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_DELIVERY_STATUSES)

export const getPaymentStatuses = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_PAYMENT_STATUSES)

export const getPMs = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_PMS)

export const getInvoiceStatuses = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_INVOICE_STATUSES)

export const getServices = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_SERVICES)

export const getFields = () =>
  axiosClient.get<{ success: boolean; data: MetadataItem[] }>(ENDPOINTS.ORDER_METADATA_FIELDS)

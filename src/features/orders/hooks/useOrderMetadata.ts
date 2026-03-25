import { useQuery } from '@tanstack/react-query'
import {
  getOrderStatuses,
  getDeliveryStatuses,
  getPaymentStatuses,
  getPMs,
  getInvoiceStatuses,
  getServices,
  getFields,
} from '../api/orderMetadataApi'

export const useOrderStatuses = () =>
  useQuery({
    queryKey: ['orderStatuses'],
    queryFn: () => getOrderStatuses().then((res) => res.data.data),
  })

export const useDeliveryStatuses = () =>
  useQuery({
    queryKey: ['deliveryStatuses'],
    queryFn: () => getDeliveryStatuses().then((res) => res.data.data),
  })

export const usePaymentStatuses = () =>
  useQuery({
    queryKey: ['paymentStatuses'],
    queryFn: () => getPaymentStatuses().then((res) => res.data.data),
  })

export const usePMs = () =>
  useQuery({
    queryKey: ['pms'],
    queryFn: () => getPMs().then((res) => res.data.data),
  })

export const useInvoiceStatuses = () =>
  useQuery({
    queryKey: ['invoiceStatuses'],
    queryFn: () => getInvoiceStatuses().then((res) => res.data.data),
  })

export const useServices = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: () => getServices().then((res) => res.data.data),
  })

export const useFields = () =>
  useQuery({
    queryKey: ['fields'],
    queryFn: () => getFields().then((res) => res.data.data),
  })

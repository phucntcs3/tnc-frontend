export interface NamedEntity {
  id: number
  name: string
}

export interface OrderUser {
  id: number
  email: string
}

export interface Order {
  key: string
  id: number
  date: string
  webPo: string | null
  amount: number
  exchangeRate: number
  taskNo: string | null
  deadlineAt: string | null
  deadlineNote: string | null
  note: string | null
  cost: number
  client: NamedEntity | null
  pm: NamedEntity | null
  invoiceStatus: NamedEntity | null
  service: NamedEntity | null
  field: NamedEntity | null
  orderStatus: NamedEntity | null
  deliveryStatus: NamedEntity | null
  paymentStatus: NamedEntity | null
  account: NamedEntity | null
  user: OrderUser | null
}

export const invoiceStatusColorMap: Record<string, string> = {
  Invoice: 'blue',
  Paid: 'green',
  Cancel: 'red',
  Free: 'default',
}

export const statusColorMap: Record<string, string> = {
  Assigned: 'blue',
  'Not Yet': 'orange',
  'Pass Test': 'green',
  'Fail Test': 'red',
  Cancel: 'default',
}

export const deliveryColorMap: Record<string, string> = {
  Deliveried: 'green',
  Running: 'blue',
}

export const paymentStatusColorMap: Record<string, string> = {
  Pending: 'orange',
  Paid: 'green',
  Free: 'default',
  Canceled: 'red',
}

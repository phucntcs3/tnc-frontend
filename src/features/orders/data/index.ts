export interface Order {
  key: string
  date: string
  client: string
  pm: string
  webPo: string
  invoiceStatus: string
  service: string
  field: string
  amount: number
  taskNo: string
  status: string
  assignee: string
  deadline: string
  note: string
  delivery: string
  cost: number
  paymentStatus: string
}

export const clientOptions = [
  { value: 'ICS Digital', label: 'ICS Digital' },
  { value: 'Maxsun', label: 'Maxsun' },
  { value: 'Clever Translation', label: 'Clever Translation' },
  { value: 'Aplus', label: 'Aplus' },
  { value: 'Talking China', label: 'Talking China' },
  { value: 'GTH Translation', label: 'GTH Translation' },
  { value: 'Talented Translators', label: 'Talented Translators' },
  { value: 'AsiaLocalize', label: 'AsiaLocalize' },
  { value: 'Intext', label: 'Intext' },
  { value: 'Yeehe', label: 'Yeehe' },
  { value: 'Qontent Group', label: 'Qontent Group' },
  { value: 'EXE', label: 'EXE' },
  { value: 'MYL', label: 'MYL' },
]

export const invoiceStatusOptions = [
  { value: 'Invoice', label: 'Invoice' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Cancel', label: 'Cancel' },
  { value: 'Free', label: 'Free' },
]

export const serviceOptions = [
  { value: 'Job', label: 'Job' },
  { value: 'Test', label: 'Test' },
]

export const statusOptions = [
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Not Yet', label: 'Not Yet' },
  { value: 'Pass Test', label: 'Pass Test' },
  { value: 'Fail Test', label: 'Fail Test' },
  { value: 'Cancel', label: 'Cancel' },
]

export const assigneeOptions = [
  { value: 'Tom Team', label: 'Tom Team' },
  { value: 'Tuấn Trần', label: 'Tuấn Trần' },
  { value: 'Công', label: 'Công' },
]

export const deliveryOptions = [
  { value: 'Deliveried', label: 'Deliveried' },
  { value: 'Running', label: 'Running' },
]

export const paymentStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Free', label: 'Free' },
  { value: 'Canceled', label: 'Canceled' },
]

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

export const mockOrders: Order[] = [
  {
    key: '1',
    date: '2026-03-20',
    client: 'ICS Digital',
    pm: 'Sarah',
    webPo: 'WEB-2026-001',
    invoiceStatus: 'Invoice',
    service: 'Job',
    field: 'Legal',
    amount: 1500,
    taskNo: 'TN-001',
    status: 'Assigned',
    assignee: 'Tuấn Trần',
    deadline: '3pm 25/3',
    note: 'Urgent - legal contract translation',
    delivery: 'Running',
    cost: 800,
    paymentStatus: 'Pending',
  },
  {
    key: '2',
    date: '2026-03-18',
    client: 'Maxsun',
    pm: 'John',
    webPo: 'PO-4521',
    invoiceStatus: 'Paid',
    service: 'Job',
    field: 'Medical',
    amount: 2300,
    taskNo: 'TN-002',
    status: 'Pass Test',
    assignee: 'Tom Team',
    deadline: 'noon 22/3',
    note: 'Medical device manual',
    delivery: 'Deliveried',
    cost: 1200,
    paymentStatus: 'Paid',
  },
  {
    key: '3',
    date: '2026-03-21',
    client: 'Clever Translation',
    pm: 'Emily',
    webPo: 'WEB-2026-003',
    invoiceStatus: 'Free',
    service: 'Test',
    field: 'IT',
    amount: 0,
    taskNo: 'TN-003',
    status: 'Not Yet',
    assignee: 'Công',
    deadline: 'ASAP',
    note: 'Free test task for new client',
    delivery: 'Running',
    cost: 0,
    paymentStatus: 'Free',
  },
  {
    key: '4',
    date: '2026-03-15',
    client: 'Aplus',
    pm: 'David',
    webPo: 'PO-8834',
    invoiceStatus: 'Cancel',
    service: 'Job',
    field: 'Marketing',
    amount: 900,
    taskNo: 'TN-004',
    status: 'Cancel',
    assignee: 'Tuấn Trần',
    deadline: '5pm 20/3',
    note: 'Client cancelled the project',
    delivery: 'Running',
    cost: 0,
    paymentStatus: 'Canceled',
  },
  {
    key: '5',
    date: '2026-03-22',
    client: 'Talking China',
    pm: 'Lisa',
    webPo: 'WEB-2026-005',
    invoiceStatus: 'Invoice',
    service: 'Job',
    field: 'Gaming',
    amount: 3500,
    taskNo: 'TN-005',
    status: 'Assigned',
    assignee: 'Tom Team',
    deadline: '3pm 30/3',
    note: 'Game localization - Vietnamese',
    delivery: 'Running',
    cost: 1800,
    paymentStatus: 'Pending',
  },
]

export const recentOrders = [
  {
    key: '1',
    orderId: 'ĐH-001',
    customer: 'Nguyễn Văn A',
    total: 1500000,
    status: 'completed',
    date: '2026-03-23',
  },
  {
    key: '2',
    orderId: 'ĐH-002',
    customer: 'Trần Thị B',
    total: 2300000,
    status: 'pending',
    date: '2026-03-22',
  },
  {
    key: '3',
    orderId: 'ĐH-003',
    customer: 'Lê Văn C',
    total: 800000,
    status: 'processing',
    date: '2026-03-22',
  },
  {
    key: '4',
    orderId: 'ĐH-004',
    customer: 'Phạm Thị D',
    total: 4200000,
    status: 'completed',
    date: '2026-03-21',
  },
  {
    key: '5',
    orderId: 'ĐH-005',
    customer: 'Hoàng Văn E',
    total: 950000,
    status: 'cancelled',
    date: '2026-03-21',
  },
]

export const dashboardStatusMap: Record<string, { color: string; label: string }> = {
  completed: { color: 'green', label: 'Hoàn thành' },
  pending: { color: 'orange', label: 'Chờ xử lý' },
  processing: { color: 'blue', label: 'Đang xử lý' },
  cancelled: { color: 'red', label: 'Đã huỷ' },
}

export const clientStats = [
  { type: 'Khách mới', value: 48 },
  { type: 'Khách cũ quay lại', value: 152 },
  { type: 'Khách không hoạt động', value: 23 },
]

export const topEmployees = [
  { name: 'Nguyễn Văn A', revenue: 32000000 },
  { name: 'Trần Thị B', revenue: 28500000 },
  { name: 'Lê Văn C', revenue: 24000000 },
  { name: 'Phạm Thị D', revenue: 19500000 },
  { name: 'Hoàng Văn E', revenue: 15000000 },
]

export const topAccounts = [
  { name: 'admin', revenue: 45000000 },
  { name: 'sales01', revenue: 38000000 },
  { name: 'sales02', revenue: 31000000 },
  { name: 'manager01', revenue: 22000000 },
  { name: 'sales03', revenue: 17500000 },
]

function randomRevenue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function getRevenueData(tab: string): { period: string; revenue: number }[] {
  const now = new Date()

  if (tab === 'week') {
    return [
      { period: 'T2', revenue: randomRevenue(3000000, 8000000) },
      { period: 'T3', revenue: randomRevenue(3000000, 8000000) },
      { period: 'T4', revenue: randomRevenue(3000000, 8000000) },
      { period: 'T5', revenue: randomRevenue(3000000, 8000000) },
      { period: 'T6', revenue: randomRevenue(3000000, 8000000) },
      { period: 'T7', revenue: randomRevenue(3000000, 8000000) },
      { period: 'CN', revenue: randomRevenue(3000000, 8000000) },
    ]
  }

  if (tab === 'month') {
    const days = getDaysInMonth(now.getFullYear(), now.getMonth())
    return Array.from({ length: days }, (_, i) => ({
      period: `${i + 1}`,
      revenue: randomRevenue(2000000, 8000000),
    }))
  }

  if (tab === 'quarter') {
    return [
      { period: 'Quý 1', revenue: randomRevenue(250000000, 350000000) },
      { period: 'Quý 2', revenue: randomRevenue(250000000, 350000000) },
      { period: 'Quý 3', revenue: randomRevenue(250000000, 350000000) },
    ]
  }

  // year
  const monthNames = [
    'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
    'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12',
  ]
  return monthNames.map((name) => ({
    period: name,
    revenue: randomRevenue(80000000, 150000000),
  }))
}

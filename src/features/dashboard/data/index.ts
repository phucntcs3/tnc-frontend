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

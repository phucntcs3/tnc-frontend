import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import {
  DollarOutlined,
  RiseOutlined,
  UserAddOutlined,
  ReloadOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Pie } from '@ant-design/charts'

const recentOrders = [
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

const statusMap: Record<string, { color: string; label: string }> = {
  completed: { color: 'green', label: 'Hoàn thành' },
  pending: { color: 'orange', label: 'Chờ xử lý' },
  processing: { color: 'blue', label: 'Đang xử lý' },
  cancelled: { color: 'red', label: 'Đã huỷ' },
}

const columns = [
  { title: 'Mã đơn', dataIndex: 'orderId', key: 'orderId' },
  { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
    render: (value: number) => value.toLocaleString('vi-VN') + ' ₫',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const s = statusMap[status]
      return <Tag color={s.color}>{s.label}</Tag>
    },
  },
  { title: 'Ngày', dataIndex: 'date', key: 'date' },
]

function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Revenue & Profit */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12}>
          <Card style={{ background: 'linear-gradient(135deg, #1677ff, #69b1ff)', border: 'none' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>Tổng doanh thu</span>}
              value={125000000}
              precision={0}
              prefix={<DollarOutlined />}
              suffix="₫"
              formatter={(value) => Number(value).toLocaleString('vi-VN')}
              valueStyle={{ color: '#fff' }}
            />
            <div className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <RiseOutlined /> +12.5% so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ background: 'linear-gradient(135deg, #fa8c16, #ffc069)', border: 'none' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>Tổng lợi nhuận</span>}
              value={45000000}
              precision={0}
              prefix={<DollarOutlined />}
              suffix="₫"
              formatter={(value) => Number(value).toLocaleString('vi-VN')}
              valueStyle={{ color: '#fff' }}
            />
            <div className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <RiseOutlined /> +8.3% so với tháng trước
            </div>
          </Card>
        </Col>
      </Row>

      {/* Customer Volume */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12}>
          <Card title="Thống kê khách hàng">
            <Pie
              data={[
                { type: 'Khách mới', value: 48 },
                { type: 'Khách cũ quay lại', value: 152 },
                { type: 'Khách không hoạt động', value: 23 },
              ]}
              angleField="value"
              colorField="type"
              innerRadius={0.6}
              scale={{ color: { range: ['#1677ff', '#52c41a', '#bfbfbf'] } }}
              label={{
                text: 'value',
                style: { fontWeight: 'bold' },
              }}
              legend={{
                color: {
                  position: 'bottom',
                  layout: { justifyContent: 'center' },
                },
              }}
              height={300}
            />
          </Card>
        </Col>

      </Row>

      {/* Recent Orders */}
      <Card title="5 đơn hàng mới nhất">
        <Table
          columns={columns}
          dataSource={recentOrders}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>
    </div>
  )
}

export default DashboardPage

import { Pie } from '@ant-design/charts'
import {
  DollarOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import { recentOrders, dashboardStatusMap, clientStats } from '../data/dashboard'

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
      const s = dashboardStatusMap[status]
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
              valueStyle={{ color: '#fff', fontWeight: 'bold' }}
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
              valueStyle={{ color: '#fff', fontWeight: 'bold' }}
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
              data={clientStats}
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

import { Bar, Line, Pie } from '@ant-design/charts'
import {
  DollarOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { Card, Col, Row, Space, Statistic, Table, Tabs, Tag } from 'antd'
import { useState } from 'react'
import { recentOrders, dashboardStatusMap, clientStats, getRevenueData, topEmployees } from '../data'
import { useMemo } from 'react'

const revenueTabs = [
  { key: 'week', label: 'Tuần' },
  { key: 'month', label: 'Tháng' },
  { key: 'quarter', label: 'Quý' },
  { key: 'year', label: 'Năm' },
]

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
  const [revenueTab, setRevenueTab] = useState('week')
  const revenueChartData = useMemo(() => getRevenueData(revenueTab), [revenueTab])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Revenue & Profit */}
      <Space orientation='vertical' className='w-full' size={16}>
        <Row gutter={[16, 16]}>
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

        {/* Revenue Chart */}
        <Card
          title="Biểu đồ doanh thu"
          extra={
            <Tabs
              activeKey={revenueTab}
              onChange={setRevenueTab}
              items={revenueTabs}
              size="small"
            />
          }
        >
          <Line
            data={revenueChartData}
            xField="period"
            yField="revenue"
            shapeField="smooth"
            style={{ stroke: '#1677ff', lineWidth: 2 }}
            point={{ shapeField: 'circle', sizeField: 3 }}
            axis={{
              y: {
                labelFormatter: (v: number) => (v / 1000000).toFixed(0) + 'tr',
              },
            }}
            tooltip={{
              items: [
                {
                  field: 'revenue',
                  name: 'Doanh thu',
                  valueFormatter: (v: number) => v.toLocaleString('vi-VN') + ' ₫',
                },
              ],
            }}
            height={250}
          />
        </Card>

        {/* Customer Volume */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card title="Thống kê khách hàng">
              <Pie
                data={clientStats}
                angleField="value"
                colorField="type"
                innerRadius={0.6}
                scale={{ color: { range: ['#4096ff', '#389e0d', '#ff7875'] } }}
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
          <Col xs={24} sm={12}>
            <Card title="Top 5 nhân viên doanh thu cao nhất tháng">
              <Bar
                data={[...topEmployees].reverse()}
                xField="name"
                yField="revenue"
                color="#1677ff"
                label={{
                  text: (d: { revenue: number }) => d.revenue.toLocaleString('vi-VN') + ' ₫',
                  position: 'outside',
                  style: { fontSize: 11 },
                }}
                axis={{
                  y: { labelFormatter: (v: number) => (v / 1000000).toFixed(0) + 'tr' },
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
      </Space>
    </div>
  )
}

export default DashboardPage

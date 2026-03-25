import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useClients } from '../hooks/useClients'
import { ITEM_PER_PAGE } from '@/constants'
import type { Client } from '../data'

const columns = [
  { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
  { title: 'Địa điểm', dataIndex: 'location', key: 'location', render: (v: string | null) => v ?? '' },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
    render: (v: string | null) => v ? <a href={v} target="_blank" rel="noreferrer">{v}</a> : '',
  },
  { title: 'Email', dataIndex: 'email', key: 'email', render: (v: string | null) => v ?? '' },
  {
    title: 'Thanh toán',
    dataIndex: 'paymentTerms',
    key: 'paymentTerms',
    render: (v: number | null) => v ? `${v} ngày` : '',
  },
  {
    title: 'Bảng giá',
    children: [
      {
        title: 'Translation',
        key: 'rate_trans',
        render: (_: unknown, record: Client) => {
          const r = record.rates.find((r) => r.serviceType.code === 'TRANS')
          return r ? `${parseFloat(r.amount)} ${r.currency.code}/${r.unit.name}` : ''
        },
      },
      {
        title: 'Editing/Proofreading',
        key: 'rate_edit',
        render: (_: unknown, record: Client) => {
          const r = record.rates.find((r) => r.serviceType.code === 'EDIT')
          return r ? `${parseFloat(r.amount)} ${r.currency.code}/${r.unit.name}` : ''
        },
      },
      {
        title: 'MTPE',
        key: 'rate_mtpe',
        render: (_: unknown, record: Client) => {
          const r = record.rates.find((r) => r.serviceType.code === 'MTPE')
          return r ? `${parseFloat(r.amount)} ${r.currency.code}/${r.unit.name}` : ''
        },
      },
      {
        title: 'Hourly rate',
        key: 'rate_hourly',
        render: (_: unknown, record: Client) => {
          const r = record.rates.find((r) => r.serviceType.code === 'HOURLY')
          return r ? `${parseFloat(r.amount)} ${r.currency.code}/${r.unit.name}` : ''
        },
      },
    ],
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? 'Hoạt động' : 'Không hoạt động'}
      </Tag>
    ),
  },
  { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
  {
    title: 'Hành động',
    key: 'action',
    width: 120,
    fixed: 'right' as const,
    render: (_: unknown, _record: Client) => (
      <Space>
        <Button type="link" size="small" icon={<EditOutlined />} />
        <Button type="link" size="small" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
]

function ClientPage() {
  const { data = [], isLoading } = useClients()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Khách hàng</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm khách hàng
        </Button>
      </div>
      <Table columns={columns} dataSource={data} bordered loading={isLoading} pagination={{ pageSize: ITEM_PER_PAGE }} scroll={{ x: 1800 }} />
    </div>
  )
}

export default ClientPage

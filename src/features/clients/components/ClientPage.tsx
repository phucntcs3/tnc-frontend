import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { mockClients } from '../data'

const columns = [
  { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
  { title: 'Người liên hệ', dataIndex: 'contact', key: 'contact' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
      </Tag>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: () => (
      <Space>
        <Button type="link" icon={<EditOutlined />} />
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
]

function ClientPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Khách hàng</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm khách hàng
        </Button>
      </div>
      <Table columns={columns} dataSource={mockClients} bordered />
    </div>
  )
}

export default ClientPage

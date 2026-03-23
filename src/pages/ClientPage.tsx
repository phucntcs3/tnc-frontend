import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const data = [
  { key: '1', name: 'Công ty ABC', contact: 'Nguyễn Văn A', phone: '0901234567', status: 'active' },
  { key: '2', name: 'Công ty XYZ', contact: 'Trần Thị B', phone: '0912345678', status: 'active' },
  { key: '3', name: 'Cá nhân Lê C', contact: 'Lê Văn C', phone: '0923456789', status: 'inactive' },
]

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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default ClientPage

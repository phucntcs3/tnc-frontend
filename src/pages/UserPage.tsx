import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const data = [
  { key: '1', name: 'Nguyễn Văn A', email: 'a@email.com', role: 'admin', status: 'active' },
  { key: '2', name: 'Trần Thị B', email: 'b@email.com', role: 'user', status: 'active' },
  { key: '3', name: 'Lê Văn C', email: 'c@email.com', role: 'user', status: 'inactive' },
]

const columns = [
  { title: 'Tên', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => (
      <Tag color={role === 'admin' ? 'blue' : 'default'}>{role.toUpperCase()}</Tag>
    ),
  },
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

function UserPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm user
        </Button>
      </div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}

export default UserPage

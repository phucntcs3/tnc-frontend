import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const data = [
  { key: '1', username: 'admin01', fullName: 'Nguyễn Văn A', role: 'admin', status: 'active' },
  { key: '2', username: 'user01', fullName: 'Trần Thị B', role: 'user', status: 'active' },
  { key: '3', username: 'user02', fullName: 'Lê Văn C', role: 'user', status: 'locked' },
]

const columns = [
  { title: 'Username', dataIndex: 'username', key: 'username' },
  { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
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
        {status === 'active' ? 'Hoạt động' : 'Đã khoá'}
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

function AccountPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Accounts</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm account
        </Button>
      </div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}

export default AccountPage

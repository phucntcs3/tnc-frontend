import { useState } from 'react'
import {
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import {
  type User,
  mockUsers,
  roleOptions,
  roleColorMap,
} from '../data'

interface UserFormValues {
  email: string
  roleId: number
}

function UserPage() {
  const [data, setData] = useState<User[]>(mockUsers)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewingUser, setViewingUser] = useState<User | null>(null)
  const [form] = Form.useForm<UserFormValues>()

  const openCreate = () => {
    setEditingUser(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: User) => {
    setEditingUser(record)
    form.setFieldsValue({
      email: record.email,
      roleId: record.roleId,
    })
    setModalOpen(true)
  }

  const openDetail = (record: User) => {
    setViewingUser(record)
    setDetailOpen(true)
  }

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((item) => item.key !== key))
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      const roleName =
        roleOptions.find((r) => r.value === values.roleId)?.label ?? ''

      if (editingUser) {
        setData((prev) =>
          prev.map((item) =>
            item.key === editingUser.key
              ? { ...item, email: values.email, roleId: values.roleId, roleName }
              : item,
          ),
        )
      } else {
        const newId = Math.max(...data.map((d) => d.id), 0) + 1
        const newUser: User = {
          key: String(Date.now()),
          id: newId,
          email: values.email,
          isActive: true,
          isFirstLogin: true,
          roleId: values.roleId,
          roleName,
          accountId: null,
          createdAt: new Date().toISOString().split('T')[0],
        }
        setData((prev) => [...prev, newUser])
      }

      setModalOpen(false)
      form.resetFields()
    })
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Vai trò',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (role: string) => (
        <Tag color={roleColorMap[role] || 'default'}>{role}</Tag>
      ),
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
    {
      title: 'Đăng nhập lần đầu',
      dataIndex: 'isFirstLogin',
      key: 'isFirstLogin',
      render: (val: boolean) => (
        <Tag color={val ? 'orange' : 'default'}>
          {val ? 'Chưa' : 'Đã đăng nhập'}
        </Tag>
      ),
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openDetail(record)}
          />
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
          />
          <Popconfirm
            title="Xoá user này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm user
        </Button>
      </div>

      <Table columns={columns} dataSource={data} bordered />

      {/* Create / Edit Modal */}
      <Modal
        title={editingUser ? 'Chỉnh sửa user' : 'Thêm user'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingUser ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            name="roleId"
            label="Vai trò"
            rules={[{ required: true, message: 'Chọn vai trò' }]}
          >
            <Select options={roleOptions} placeholder="Chọn vai trò" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết user"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        destroyOnHidden
      >
        {viewingUser && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">ID</span>
              <div className="font-medium">{viewingUser.id}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Email</span>
              <div className="font-medium">{viewingUser.email}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Vai trò</span>
              <div>
                <Tag color={roleColorMap[viewingUser.roleName] || 'default'}>
                  {viewingUser.roleName}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Trạng thái</span>
              <div>
                <Tag color={viewingUser.isActive ? 'green' : 'red'}>
                  {viewingUser.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Đăng nhập lần đầu</span>
              <div>
                <Tag color={viewingUser.isFirstLogin ? 'orange' : 'default'}>
                  {viewingUser.isFirstLogin ? 'Chưa' : 'Đã đăng nhập'}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ngày tạo</span>
              <div className="font-medium">{viewingUser.createdAt}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UserPage

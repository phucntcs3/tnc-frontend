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
  message,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import type { User, UserAccount } from '../data'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers'
import { useRoles } from '../../roles/hooks/useRoles'

const roleColorMap: Record<number, string> = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'orange',
}

interface UserFormValues {
  email: string
  roleId: number
}

function UserPage() {
  const { data = [], isLoading } = useUsers()
  const { data: roles = [] } = useRoles()
  const createUser = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

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

  const handleDelete = (record: User) => {
    deleteUserMutation.mutate(record.id, {
      onSuccess: () => message.success('Xoá user thành công'),
      onError: () => message.error('Xoá user thất bại'),
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        updateUserMutation.mutate(
          { id: editingUser.id, data: values },
          {
            onSuccess: () => {
              message.success('Cập nhật user thành công')
              setModalOpen(false)
              form.resetFields()
            },
            onError: () => message.error('Cập nhật user thất bại'),
          },
        )
      } else {
        createUser.mutate(values, {
          onSuccess: () => {
            message.success('Tạo user thành công')
            setModalOpen(false)
            form.resetFields()
          },
          onError: () => message.error('Tạo user thất bại'),
        })
      }
    })
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: number) => {
        const role = roles.find((r) => r.id === roleId)
        return <Tag color={roleColorMap[roleId] || 'default'}>{role?.name ?? roleId}</Tag>
      },
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
        <Tag color={val ? 'default' : 'green'}>
          {val ? 'Chưa' : 'Đã đăng nhập'}
        </Tag>
      ),
    },
    {
      title: 'Accounts',
      dataIndex: 'accounts',
      key: 'accounts',
      render: (accounts: UserAccount[]) => (
        <Space size={4} wrap>
          {accounts.map((a) => (
            <Tag key={a.id}>{a.name}</Tag>
          ))}
        </Space>
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
            onConfirm={() => handleDelete(record)}
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

      <Table columns={columns} dataSource={data} bordered loading={isLoading} />

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
            <Select
              options={roles.map((r) => ({ value: r.id, label: r.name }))}
              placeholder="Chọn vai trò"
            />
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
                <Tag color={roleColorMap[viewingUser.roleId] || 'default'}>
                  {roles.find((r) => r.id === viewingUser.roleId)?.name ?? viewingUser.roleId}
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
                <Tag color={viewingUser.isFirstLogin ? 'default' : 'green'}>
                  {viewingUser.isFirstLogin ? 'Chưa' : 'Đã đăng nhập'}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Accounts</span>
              <div>
                <Space size={4} wrap>
                  {viewingUser.accounts.map((a) => (
                    <Tag key={a.id}>{a.name}</Tag>
                  ))}
                </Space>
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

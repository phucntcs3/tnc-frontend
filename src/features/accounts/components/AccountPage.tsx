import { useState } from 'react'
import { ITEM_PER_PAGE } from '@/constants'
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
import type { Account, AccountUser } from '../data'
import { useAccounts, useCreateAccount, useUpdateAccount, useDeleteAccount } from '../hooks/useAccounts'
import { useUsers } from '@/features/users/hooks/useUsers'

interface AccountFormValues {
  name: string
  description?: string
  note?: string
  userIds?: number[]
}

function AccountPage() {
  const { data = [], isLoading } = useAccounts()
  const createAccount = useCreateAccount()
  const updateAccountMutation = useUpdateAccount()
  const deleteAccountMutation = useDeleteAccount()

  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null)
  const { data: users = [] } = useUsers()
  const [form] = Form.useForm<AccountFormValues>()

  const openCreate = () => {
    setEditingAccount(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: Account) => {
    setEditingAccount(record)
    form.setFieldsValue({
      name: record.name,
      description: record.description ?? undefined,
      note: record.note ?? undefined,
      userIds: record.users.map((u) => u.id),
    })
    setModalOpen(true)
  }

  const openDetail = (record: Account) => {
    setViewingAccount(record)
    setDetailOpen(true)
  }

  const handleDelete = (record: Account) => {
    deleteAccountMutation.mutate(record.id, {
      onSuccess: () => message.success('Xoá account thành công'),
      onError: () => message.error('Xoá account thất bại'),
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingAccount) {
        updateAccountMutation.mutate(
          { id: editingAccount.id, data: values },
          {
            onSuccess: () => {
              message.success('Cập nhật account thành công')
              setModalOpen(false)
              form.resetFields()
            },
            onError: () => message.error('Cập nhật account thất bại'),
          },
        )
      } else {
        createAccount.mutate(values, {
          onSuccess: () => {
            message.success('Tạo account thành công')
            setModalOpen(false)
            form.resetFields()
          },
          onError: () => message.error('Tạo account thất bại'),
        })
      }
    })
  }

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      render: (users: AccountUser[]) => (
        <Space size={4} wrap>
          {users.map((u) => (
            <Tag key={u.id} className="m-0">{u.email}</Tag>
          ))}
        </Space>
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
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', render: (v: string | null) => v ?? '' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note', render: (v: string | null) => v ?? '' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Account) => (
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
            title="Xoá account này?"
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
        <h2 className="text-2xl font-semibold">Accounts</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm account
        </Button>
      </div>

      <Table columns={columns} dataSource={data} bordered loading={isLoading} pagination={{ pageSize: ITEM_PER_PAGE }} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingAccount ? 'Chỉnh sửa account' : 'Thêm account'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingAccount ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        confirmLoading={createAccount.isPending || updateAccountMutation.isPending}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Nhập tên account' }]}
          >
            <Input placeholder="Tên account" />
          </Form.Item>

          <Form.Item name="userIds" label="Users">
            <Select
              mode="multiple"
              showSearch
              placeholder="Chọn user"
              optionFilterProp="label"
              options={users.map((u) => ({ label: u.email, value: u.id }))}
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea placeholder="Mô tả" rows={3} />
          </Form.Item>

          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea placeholder="Ghi chú" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết account"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        destroyOnHidden
      >
        {viewingAccount && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">ID</span>
              <div className="font-medium">{viewingAccount.id}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Tên</span>
              <div className="font-medium">{viewingAccount.name}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Users</span>
              <div>
                {viewingAccount.users.map((u) => (
                  <Tag key={u.id}>{u.email}</Tag>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Trạng thái</span>
              <div>
                <Tag color={viewingAccount.isActive ? 'green' : 'red'}>
                  {viewingAccount.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Mô tả</span>
              <div className="font-medium">{viewingAccount.description ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ghi chú</span>
              <div className="font-medium">{viewingAccount.note ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ngày tạo</span>
              <div className="font-medium">{viewingAccount.createdAt}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AccountPage

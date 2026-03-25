import { useState } from 'react'
import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import type { AxiosError } from 'axios'
import type { Role } from '../data'
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from '../hooks/useRoles'

const getErrorMessage = (error: unknown, fallback: string) => {
  const msg = (error as AxiosError<{ message?: string }>)?.response?.data?.message
  return msg || fallback
}

interface RoleFormValues {
  name: string
  description?: string
  note?: string
}

function RolePage() {
  const { data = [], isLoading } = useRoles()
  const createRole = useCreateRole()
  const updateRoleMutation = useUpdateRole()
  const deleteRoleMutation = useDeleteRole()

  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [viewingRole, setViewingRole] = useState<Role | null>(null)
  const [form] = Form.useForm<RoleFormValues>()

  const openCreate = () => {
    setEditingRole(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: Role) => {
    setEditingRole(record)
    form.setFieldsValue({
      name: record.name,
      description: record.description ?? undefined,
      note: record.note ?? undefined,
    })
    setModalOpen(true)
  }

  const openDetail = (record: Role) => {
    setViewingRole(record)
    setDetailOpen(true)
  }

  const handleDelete = (record: Role) => {
    deleteRoleMutation.mutate(record.id, {
      onSuccess: () => message.success('Xoá role thành công'),
      onError: (error) => message.error(getErrorMessage(error, 'Xoá role thất bại')),
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingRole) {
        updateRoleMutation.mutate(
          { id: editingRole.id, data: values },
          {
            onSuccess: () => {
              message.success('Cập nhật role thành công')
              setModalOpen(false)
              form.resetFields()
            },
            onError: (error) => message.error(getErrorMessage(error, 'Cập nhật role thất bại')),
          },
        )
      } else {
        createRole.mutate(values, {
          onSuccess: () => {
            message.success('Tạo role thành công')
            setModalOpen(false)
            form.resetFields()
          },
          onError: (error) => message.error(getErrorMessage(error, 'Tạo role thất bại')),
        })
      }
    })
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', render: (v: string | null) => v ?? '' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note', render: (v: string | null) => v ?? '' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Role) => (
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
            title="Xoá role này?"
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
        <h2 className="text-2xl font-semibold">Roles</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm role
        </Button>
      </div>

      <Table columns={columns} dataSource={data} bordered loading={isLoading} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRole ? 'Chỉnh sửa role' : 'Thêm role'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingRole ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        confirmLoading={createRole.isPending || updateRoleMutation.isPending}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Nhập tên role' }]}
          >
            <Input placeholder="Tên role" />
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
        title="Chi tiết role"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        destroyOnHidden
      >
        {viewingRole && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">ID</span>
              <div className="font-medium">{viewingRole.id}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Tên</span>
              <div className="font-medium">{viewingRole.name}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Mô tả</span>
              <div className="font-medium">{viewingRole.description ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ghi chú</span>
              <div className="font-medium">{viewingRole.note ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ngày tạo</span>
              <div className="font-medium">{viewingRole.createdAt}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RolePage

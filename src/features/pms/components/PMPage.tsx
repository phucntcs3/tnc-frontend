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
import { usePMs, useCreatePM, useUpdatePM, useDeletePM } from '../hooks/usePMs'
import { useClients } from '@/features/clients/hooks/useClients'
import { ITEM_PER_PAGE } from '@/constants'
import type { PM } from '../data'
import type { ColumnsType } from 'antd/es/table'

interface PMFormValues {
  name: string
  client_id?: number | null
  description?: string
  note?: string
}

function PMPage() {
  const { data = [], isLoading } = usePMs()
  const { data: clients = [] } = useClients()
  const createPMMutation = useCreatePM()
  const updatePMMutation = useUpdatePM()
  const deletePMMutation = useDeletePM()

  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingPM, setEditingPM] = useState<PM | null>(null)
  const [viewingPM, setViewingPM] = useState<PM | null>(null)
  const [form] = Form.useForm<PMFormValues>()

  const openCreate = () => {
    setEditingPM(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: PM) => {
    setEditingPM(record)
    form.setFieldsValue({
      name: record.name,
      client_id: record.clientId ?? undefined,
      description: record.description ?? undefined,
      note: record.note ?? undefined,
    })
    setModalOpen(true)
  }

  const openDetail = (record: PM) => {
    setViewingPM(record)
    setDetailOpen(true)
  }

  const handleDelete = (record: PM) => {
    deletePMMutation.mutate(record.id, {
      onSuccess: () => message.success('Xoá PM thành công'),
      onError: (error: any) =>
        message.error(error?.response?.data?.message || 'Xoá PM thất bại'),
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingPM) {
        updatePMMutation.mutate(
          { id: editingPM.id, data: values },
          {
            onSuccess: () => {
              message.success('Cập nhật PM thành công')
              setModalOpen(false)
              form.resetFields()
            },
            onError: (error: any) =>
              message.error(error?.response?.data?.message || 'Cập nhật PM thất bại'),
          },
        )
      } else {
        createPMMutation.mutate(values, {
          onSuccess: () => {
            message.success('Tạo PM thành công')
            setModalOpen(false)
            form.resetFields()
          },
          onError: (error: any) =>
            message.error(error?.response?.data?.message || 'Tạo PM thất bại'),
        })
      }
    })
  }

  const columns: ColumnsType<PM> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Khách hàng',
      key: 'clientId',
      render: (_: unknown, record: PM) => {
        const client = clients.find((c) => c.id === record.clientId)
        return client?.name ?? ''
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (val: string | null) => val ?? '',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (val: string | null) => val ?? '',
    },
    {
      title: 'Trạng thái',
      key: 'isActive',
      render: (_: unknown, record: PM) => (
        <Tag color={record.isActive ? 'green' : 'red'}>
          {record.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: (_: unknown, record: PM) => (
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
            title="Xoá PM này?"
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
        <h2 className="text-2xl font-semibold">Quản lý PM</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm PM
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        loading={isLoading}
        pagination={{ pageSize: ITEM_PER_PAGE }}
      />

      {/* Create / Edit Modal */}
      <Modal
        title={editingPM ? 'Chỉnh sửa PM' : 'Thêm PM'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingPM ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        confirmLoading={createPMMutation.isPending || updatePMMutation.isPending}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Tên PM"
            rules={[{ required: true, message: 'Nhập tên PM' }]}
          >
            <Input placeholder="Tên PM" />
          </Form.Item>
          <Form.Item name="client_id" label="Khách hàng">
            <Select
              placeholder="Chọn khách hàng"
              allowClear
              showSearch
              optionFilterProp="label"
              options={clients.map((c) => ({ value: c.id, label: c.name }))}
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
        title="Chi tiết PM"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        destroyOnHidden
      >
        {viewingPM && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">ID</span>
              <div className="font-medium">{viewingPM.id}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Tên</span>
              <div className="font-medium">{viewingPM.name}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Khách hàng</span>
              <div className="font-medium">
                {clients.find((c) => c.id === viewingPM.clientId)?.name ?? ''}
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Mô tả</span>
              <div className="font-medium">{viewingPM.description ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ghi chú</span>
              <div className="font-medium">{viewingPM.note ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Trạng thái</span>
              <div>
                <Tag color={viewingPM.isActive ? 'green' : 'red'}>
                  {viewingPM.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PMPage

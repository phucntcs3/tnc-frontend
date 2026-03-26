import { useState, useMemo } from 'react'
import {
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Popconfirm,
  message,
  Row,
  Col,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '../hooks/useClients'
import { ITEM_PER_PAGE } from '@/constants'
import type { Client, Rate } from '../data'
import type { ColumnsType } from 'antd/es/table'

interface ClientRow {
  key: string
  client: Client
  rate: Rate | null
  rowSpan: number
}

interface ClientFormValues {
  name: string
  description?: string
  note?: string
  location?: string
  website?: string
  email?: string
  paymentTerms?: number
  establishedAt?: dayjs.Dayjs
}

function flattenClients(clients: Client[]): ClientRow[] {
  const rows: ClientRow[] = []
  for (const client of clients) {
    const { rates } = client
    if (rates.length === 0) {
      rows.push({ key: `${client.id}-0`, client, rate: null, rowSpan: 1 })
    } else {
      rates.forEach((rate, i) => {
        rows.push({
          key: `${client.id}-${i}`,
          client,
          rate,
          rowSpan: i === 0 ? rates.length : 0,
        })
      })
    }
  }
  return rows
}

function withRowSpan(render: (row: ClientRow) => React.ReactNode) {
  return {
    render: (_: unknown, row: ClientRow) => ({
      children: render(row),
      props: { rowSpan: row.rowSpan },
    }),
  }
}

function formatRateForCode(rate: Rate | null, code: string): string {
  if (!rate || rate.serviceType.code !== code) return ''
  return `${parseFloat(rate.amount)} ${rate.currency.code}/${rate.unit.name}`
}

function ClientPage() {
  const { data = [], isLoading } = useClients()
  const createClientMutation = useCreateClient()
  const updateClientMutation = useUpdateClient()
  const deleteClientMutation = useDeleteClient()

  const rows = useMemo(() => flattenClients(data), [data])

  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [viewingClient, setViewingClient] = useState<Client | null>(null)
  const [form] = Form.useForm<ClientFormValues>()

  const openCreate = () => {
    setEditingClient(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: Client) => {
    setEditingClient(record)
    form.setFieldsValue({
      name: record.name,
      description: record.description ?? undefined,
      note: record.note ?? undefined,
      location: record.location ?? undefined,
      website: record.website ?? undefined,
      email: record.email ?? undefined,
      paymentTerms: record.paymentTerms ?? undefined,
      establishedAt: record.establishedAt ? dayjs(record.establishedAt) : undefined,
    })
    setModalOpen(true)
  }

  const openDetail = (record: Client) => {
    setViewingClient(record)
    setDetailOpen(true)
  }

  const handleDelete = (record: Client) => {
    deleteClientMutation.mutate(record.id, {
      onSuccess: () => message.success('Xoá khách hàng thành công'),
      onError: (error: any) =>
        message.error(error?.response?.data?.message || 'Xoá khách hàng thất bại'),
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        establishedAt: values.establishedAt ? values.establishedAt.format('YYYY-MM-DD') : undefined,
      }
      if (editingClient) {
        updateClientMutation.mutate(
          { id: editingClient.id, data: payload },
          {
            onSuccess: () => {
              message.success('Cập nhật khách hàng thành công')
              setModalOpen(false)
              form.resetFields()
            },
            onError: (error: any) =>
              message.error(error?.response?.data?.message || 'Cập nhật khách hàng thất bại'),
          },
        )
      } else {
        createClientMutation.mutate(payload, {
          onSuccess: () => {
            message.success('Tạo khách hàng thành công')
            setModalOpen(false)
            form.resetFields()
          },
          onError: (error: any) =>
            message.error(error?.response?.data?.message || 'Tạo khách hàng thất bại'),
        })
      }
    })
  }

  const columns: ColumnsType<ClientRow> = [
    {
      title: 'Tên khách hàng',
      key: 'name',
      ...withRowSpan((row) => row.client.name),
    },
    {
      title: 'Địa điểm',
      key: 'location',
      ...withRowSpan((row) => row.client.location ?? ''),
    },
    {
      title: 'Website',
      key: 'website',
      ...withRowSpan((row) =>
        row.client.website ? (
          <a href={row.client.website} target="_blank" rel="noreferrer">
            {row.client.website}
          </a>
        ) : (
          ''
        ),
      ),
    },
    {
      title: 'Thanh toán',
      key: 'paymentTerms',
      ...withRowSpan((row) => (row.client.paymentTerms ? `${row.client.paymentTerms} ngày` : '')),
    },
    {
      title: 'Account',
      key: 'account',
      render: (_: unknown, row: ClientRow) => row.rate?.account?.name ?? '',
    },
    {
      title: 'Sale',
      key: 'sale',
      width: 180,
      render: (_: unknown, row: ClientRow) => row.rate?.sale?.email ?? '',
    },
    {
      title: 'Thanh toán',
      children: [
        {
          title: 'Translation',
          key: 'rate_trans',
          render: (_: unknown, row: ClientRow) => formatRateForCode(row.rate, 'TRANS'),
        },
        {
          title: 'Editing/Proofreading',
          key: 'rate_edit',
          render: (_: unknown, row: ClientRow) => formatRateForCode(row.rate, 'EDIT'),
        },
        {
          title: 'MTPE',
          key: 'rate_mtpe',
          render: (_: unknown, row: ClientRow) => formatRateForCode(row.rate, 'MTPE'),
        },
        {
          title: 'Hourly rate',
          key: 'rate_hourly',
          render: (_: unknown, row: ClientRow) => formatRateForCode(row.rate, 'HOURLY'),
        },
      ],
    },
    {
      title: 'Trạng thái',
      key: 'isActive',
      ...withRowSpan((row) => (
        <Tag color={row.client.isActive ? 'green' : 'red'}>
          {row.client.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      )),
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      ...withRowSpan((row) => row.client.createdAt),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      ...withRowSpan((row) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openDetail(row.client)}
          />
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(row.client)}
          />
          <Popconfirm
            title="Xoá khách hàng này?"
            onConfirm={() => handleDelete(row.client)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Khách hàng</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm khách hàng
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={rows}
        bordered
        loading={isLoading}
        pagination={{ pageSize: ITEM_PER_PAGE }}
        scroll={{ x: 1800 }}
      />

      {/* Create / Edit Modal */}
      <Modal
        title={editingClient ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingClient ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        confirmLoading={createClientMutation.isPending || updateClientMutation.isPending}
        destroyOnHidden
        width={800}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Tên khách hàng"
                rules={[{ required: true, message: 'Nhập tên khách hàng' }]}
              >
                <Input placeholder="Tên khách hàng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="location" label="Địa điểm">
                <Input placeholder="Địa điểm" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="website" label="Website">
                <Input placeholder="Website" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="paymentTerms" label="Thanh toán (ngày)">
                <InputNumber placeholder="Số ngày" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="establishedAt" label="Ngày thành lập">
                <DatePicker placeholder="Chọn ngày" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Mô tả" rows={3} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea placeholder="Ghi chú" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết khách hàng"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        destroyOnHidden
      >
        {viewingClient && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">ID</span>
              <div className="font-medium">{viewingClient.id}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Tên</span>
              <div className="font-medium">{viewingClient.name}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Địa điểm</span>
              <div className="font-medium">{viewingClient.location ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Website</span>
              <div className="font-medium">{viewingClient.website ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Email</span>
              <div className="font-medium">{viewingClient.email ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Thanh toán</span>
              <div className="font-medium">
                {viewingClient.paymentTerms ? `${viewingClient.paymentTerms} ngày` : ''}
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ngày thành lập</span>
              <div className="font-medium">{viewingClient.establishedAt ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Trạng thái</span>
              <div>
                <Tag color={viewingClient.isActive ? 'green' : 'red'}>
                  {viewingClient.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Mô tả</span>
              <div className="font-medium">{viewingClient.description ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ghi chú</span>
              <div className="font-medium">{viewingClient.note ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Ngày tạo</span>
              <div className="font-medium">{viewingClient.createdAt}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ClientPage

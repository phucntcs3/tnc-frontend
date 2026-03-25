import { useState } from 'react'
import {
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Popconfirm,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import dayjs, { type Dayjs } from 'dayjs'
import {
  type Order,
  invoiceStatusColorMap,
  statusColorMap,
  deliveryColorMap,
  paymentStatusColorMap,
} from '../data'
import { useOrders } from '../hooks/useOrders'
import { ITEM_PER_PAGE } from '@/constants'

interface OrderFormValues {
  date: Dayjs
  client: string
  pm: string
  webPo: string
  invoiceStatus: string
  service: string
  field: string
  amount: number
  taskNo: string
  status: string
  assignee: string
  deadline: string
  note: string
  delivery: string
  cost: number
  paymentStatus: string
}

function OrderPage() {
  const { data = [], isLoading } = useOrders()
  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const [form] = Form.useForm<OrderFormValues>()

  const openCreate = () => {
    setEditingOrder(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (record: Order) => {
    setEditingOrder(record)
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    })
    setModalOpen(true)
  }

  const openDetail = (record: Order) => {
    setViewingOrder(record)
    setDetailOpen(true)
  }

  const handleDelete = (_key: string) => {
    // TODO: implement with useDeleteOrder
  }

  const handleSave = () => {
    form.validateFields().then((_values) => {
      // TODO: implement with useCreateOrder / useUpdateOrder
      setModalOpen(false)
      form.resetFields()
    })
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 110,
    },
    {
      title: 'Client',
      key: 'client',
      width: 140,
      render: (_: unknown, record: Order) => record.client?.name ?? '—',
    },
    {
      title: 'PM',
      key: 'pm',
      width: 80,
      render: (_: unknown, record: Order) => record.pm?.name ?? '—',
    },
    {
      title: 'Web/PO',
      dataIndex: 'webPo',
      key: 'webPo',
      width: 140,
    },
    {
      title: 'Invoice',
      key: 'invoiceStatus',
      width: 100,
      render: (_: unknown, record: Order) => {
        const name = record.invoiceStatus?.name
        return name ? <Tag color={invoiceStatusColorMap[name]}>{name}</Tag> : '—'
      },
    },
    {
      title: 'Service',
      key: 'service',
      width: 80,
      render: (_: unknown, record: Order) => {
        const name = record.service?.name
        return name ? (
          <Tag color={name === 'Job' ? 'blue' : 'purple'}>{name}</Tag>
        ) : '—'
      },
    },
    {
      title: 'Field',
      key: 'field',
      width: 100,
      render: (_: unknown, record: Order) => record.field?.name ?? '—',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (val: number) => `$${val.toLocaleString()}`,
    },
    {
      title: 'Task No',
      dataIndex: 'taskNo',
      key: 'taskNo',
      width: 90,
    },
    {
      title: 'Status',
      key: 'status',
      width: 110,
      render: (_: unknown, record: Order) => {
        const name = record.orderStatus?.name
        return name ? <Tag color={statusColorMap[name]}>{name}</Tag> : '—'
      },
    },
    {
      title: 'Assignee',
      key: 'assignee',
      width: 120,
      render: (_: unknown, record: Order) => record.user?.email ?? '—',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadlineNote',
      key: 'deadline',
      width: 110,
    },
    {
      title: 'Delivery',
      key: 'delivery',
      width: 100,
      render: (_: unknown, record: Order) => {
        const name = record.deliveryStatus?.name
        return name ? <Tag color={deliveryColorMap[name]}>{name}</Tag> : '—'
      },
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: 90,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: 'Payment',
      key: 'paymentStatus',
      width: 100,
      render: (_: unknown, record: Order) => {
        const name = record.paymentStatus?.name
        return name ? (
          <Tag color={paymentStatusColorMap[name]}>{name}</Tag>
        ) : '—'
      },
    },
    {
      title: 'Account',
      key: 'account',
      width: 100,
      render: (_: unknown, record: Order) => record.account?.name ?? '—',
    },
    {
      title: 'Actions',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: (_: unknown, record: Order) => (
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
            title="Xoá đơn hàng này?"
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
        <h2 className="text-2xl font-semibold">Đơn hàng</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm đơn hàng
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 1800 }}
        bordered
        size="middle"
        pagination={{ pageSize: ITEM_PER_PAGE }}
      />

      {/* Create / Edit Modal */}
      <Modal
        title={editingOrder ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
        open={modalOpen}
        onOk={handleSave}
        destroyOnHidden
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        okText={editingOrder ? 'Cập nhật' : 'Tạo'}
        cancelText="Huỷ"
        width={900}
        styles={{ body: { maxHeight: 'calc(90vh - 110px)', overflowY: 'auto' } }}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <div className="grid grid-cols-3 gap-x-4">
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Chọn ngày' }]}
            >
              <DatePicker placeholder='' className="w-full" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              name="client"
              label="Client"
              rules={[{ required: true, message: 'Chọn client' }]}
            >
              <Select showSearch />
            </Form.Item>

            <Form.Item
              name="pm"
              label="PM"
              rules={[{ required: true, message: 'Nhập PM' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="webPo" label="Web/PO">
              <Input />
            </Form.Item>

            <Form.Item name="invoiceStatus" label="Invoice/Payment Status">
              <Select showSearch />
            </Form.Item>

            <Form.Item
              name="service"
              label="Service"
              rules={[{ required: true, message: 'Chọn service' }]}
            >
              <Select showSearch />
            </Form.Item>

            <Form.Item name="field" label="Field">
              <Input />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Nhập amount' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
            </Form.Item>

            <Form.Item name="taskNo" label="Task No">
              <Input />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Chọn status' }]}
            >
              <Select showSearch />
            </Form.Item>

            <Form.Item
              name="assignee"
              label="Assignee"
              rules={[{ required: true, message: 'Chọn assignee' }]}
            >
              <Select showSearch />
            </Form.Item>

            <Form.Item name="deadline" label="Deadline">
              <Input />
            </Form.Item>

            <Form.Item name="delivery" label="Delivery">
              <Select showSearch />
            </Form.Item>

            <Form.Item name="cost" label="Cost">
              <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
            </Form.Item>

            <Form.Item name="paymentStatus" label="Payment Status (Linguists)">
              <Select showSearch />
            </Form.Item>

            <Form.Item name="note" label="Note" className="col-span-3">
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết đơn hàng"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        destroyOnHidden
        footer={
          <Button onClick={() => setDetailOpen(false)}>Đóng</Button>
        }
        width={900}
      >
        {viewingOrder && (
          <div className="grid grid-cols-3 gap-y-3 gap-x-4 mt-4">
            <div>
              <span className="text-gray-500 text-sm">Date</span>
              <div className="font-medium">{viewingOrder.date}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Client</span>
              <div className="font-medium">{viewingOrder.client?.name ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">PM</span>
              <div className="font-medium">{viewingOrder.pm?.name ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Web/PO</span>
              <div className="font-medium">{viewingOrder.webPo ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Invoice Status</span>
              <div>{viewingOrder.invoiceStatus ? <Tag color={invoiceStatusColorMap[viewingOrder.invoiceStatus.name]}>{viewingOrder.invoiceStatus.name}</Tag> : '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Service</span>
              <div>{viewingOrder.service ? <Tag color={viewingOrder.service.name === 'Job' ? 'blue' : 'purple'}>{viewingOrder.service.name}</Tag> : '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Field</span>
              <div className="font-medium">{viewingOrder.field?.name ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Amount</span>
              <div className="font-medium">${viewingOrder.amount.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Task No</span>
              <div className="font-medium">{viewingOrder.taskNo ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Status</span>
              <div>{viewingOrder.orderStatus ? <Tag color={statusColorMap[viewingOrder.orderStatus.name]}>{viewingOrder.orderStatus.name}</Tag> : '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Assignee</span>
              <div className="font-medium">{viewingOrder.user?.email ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Deadline</span>
              <div className="font-medium">{viewingOrder.deadlineNote ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Delivery</span>
              <div>{viewingOrder.deliveryStatus ? <Tag color={deliveryColorMap[viewingOrder.deliveryStatus.name]}>{viewingOrder.deliveryStatus.name}</Tag> : '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Cost</span>
              <div className="font-medium">{viewingOrder.cost.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Payment Status</span>
              <div>{viewingOrder.paymentStatus ? <Tag color={paymentStatusColorMap[viewingOrder.paymentStatus.name]}>{viewingOrder.paymentStatus.name}</Tag> : '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Account</span>
              <div className="font-medium">{viewingOrder.account?.name ?? '—'}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Exchange Rate</span>
              <div className="font-medium">{viewingOrder.exchangeRate.toLocaleString()}</div>
            </div>
            <div className="col-span-3">
              <span className="text-gray-500 text-sm">Note</span>
              <div className="font-medium">{viewingOrder.note || '—'}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrderPage

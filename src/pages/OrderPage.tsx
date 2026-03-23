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
  clientOptions,
  invoiceStatusOptions,
  serviceOptions,
  statusOptions,
  assigneeOptions,
  deliveryOptions,
  paymentStatusOptions,
  invoiceStatusColorMap,
  statusColorMap,
  deliveryColorMap,
  paymentStatusColorMap,
  mockOrders,
} from '../data/orders'

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
  const [data, setData] = useState<Order[]>(mockOrders)
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

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((item) => item.key !== key))
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      const order: Order = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        key: editingOrder
          ? editingOrder.key
          : String(Date.now()),
      }

      if (editingOrder) {
        setData((prev) =>
          prev.map((item) => (item.key === editingOrder.key ? order : item)),
        )
      } else {
        setData((prev) => [...prev, order])
      }

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
      dataIndex: 'client',
      key: 'client',
      width: 140,
    },
    {
      title: 'PM',
      dataIndex: 'pm',
      key: 'pm',
      width: 80,
    },
    {
      title: 'Web/PO',
      dataIndex: 'webPo',
      key: 'webPo',
      width: 140,
    },
    {
      title: 'Invoice',
      dataIndex: 'invoiceStatus',
      key: 'invoiceStatus',
      width: 100,
      render: (val: string) => <Tag color={invoiceStatusColorMap[val]}>{val}</Tag>,
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      width: 80,
      render: (val: string) => (
        <Tag color={val === 'Job' ? 'blue' : 'purple'}>{val}</Tag>
      ),
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
      width: 100,
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
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (val: string) => <Tag color={statusColorMap[val]}>{val}</Tag>,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 120,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 110,
    },
    {
      title: 'Delivery',
      dataIndex: 'delivery',
      key: 'delivery',
      width: 100,
      render: (val: string) => <Tag color={deliveryColorMap[val]}>{val}</Tag>,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: 90,
      render: (val: number) => `$${val.toLocaleString()}`,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 100,
      render: (val: string) => (
        <Tag color={paymentStatusColorMap[val]}>{val}</Tag>
      ),
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
        scroll={{ x: 1800 }}
        bordered
        size="middle"
        pagination={{ pageSize: 10 }}
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
        destroyOnClose
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
              <Select
                showSearch
                options={clientOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
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
              <Select
                showSearch
                options={invoiceStatusOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              name="service"
              label="Service"
              rules={[{ required: true, message: 'Chọn service' }]}
            >
              <Select
                showSearch
                options={serviceOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
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
              <Select
                showSearch
                options={statusOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              name="assignee"
              label="Assignee"
              rules={[{ required: true, message: 'Chọn assignee' }]}
            >
              <Select
                showSearch
                options={assigneeOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item name="deadline" label="Deadline">
              <Input />
            </Form.Item>

            <Form.Item name="delivery" label="Delivery">
              <Select
                showSearch
                options={deliveryOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item name="cost" label="Cost">
              <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
            </Form.Item>

            <Form.Item name="paymentStatus" label="Payment Status (Linguists)">
              <Select
                showSearch
                options={paymentStatusOptions}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
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
              <div className="font-medium">{viewingOrder.client}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">PM</span>
              <div className="font-medium">{viewingOrder.pm}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Web/PO</span>
              <div className="font-medium">{viewingOrder.webPo}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Invoice Status</span>
              <div><Tag color={invoiceStatusColorMap[viewingOrder.invoiceStatus]}>{viewingOrder.invoiceStatus}</Tag></div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Service</span>
              <div><Tag color={viewingOrder.service === 'Job' ? 'blue' : 'purple'}>{viewingOrder.service}</Tag></div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Field</span>
              <div className="font-medium">{viewingOrder.field}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Amount</span>
              <div className="font-medium">${viewingOrder.amount.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Task No</span>
              <div className="font-medium">{viewingOrder.taskNo}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Status</span>
              <div><Tag color={statusColorMap[viewingOrder.status]}>{viewingOrder.status}</Tag></div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Assignee</span>
              <div className="font-medium">{viewingOrder.assignee}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Deadline</span>
              <div className="font-medium">{viewingOrder.deadline}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Delivery</span>
              <div><Tag color={deliveryColorMap[viewingOrder.delivery]}>{viewingOrder.delivery}</Tag></div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Cost</span>
              <div className="font-medium">${viewingOrder.cost.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Payment Status</span>
              <div><Tag color={paymentStatusColorMap[viewingOrder.paymentStatus]}>{viewingOrder.paymentStatus}</Tag></div>
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

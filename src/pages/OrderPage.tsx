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

interface Order {
  key: string
  date: string
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

const clientOptions = [
  { value: 'ICS Digital', label: 'ICS Digital' },
  { value: 'Maxsun', label: 'Maxsun' },
  { value: 'Clever Translation', label: 'Clever Translation' },
  { value: 'Aplus', label: 'Aplus' },
  { value: 'Talking China', label: 'Talking China' },
  { value: 'GTH Translation', label: 'GTH Translation' },
  { value: 'Talented Translators', label: 'Talented Translators' },
  { value: 'AsiaLocalize', label: 'AsiaLocalize' },
  { value: 'Intext', label: 'Intext' },
  { value: 'Yeehe', label: 'Yeehe' },
  { value: 'Qontent Group', label: 'Qontent Group' },
  { value: 'EXE', label: 'EXE' },
  { value: 'MYL', label: 'MYL' },
]

const invoiceStatusOptions = [
  { value: 'Invoice', label: 'Invoice' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Cancel', label: 'Cancel' },
  { value: 'Free', label: 'Free' },
]

const serviceOptions = [
  { value: 'Job', label: 'Job' },
  { value: 'Test', label: 'Test' },
]

const statusOptions = [
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Not Yet', label: 'Not Yet' },
  { value: 'Pass Test', label: 'Pass Test' },
  { value: 'Fail Test', label: 'Fail Test' },
  { value: 'Cancel', label: 'Cancel' },
]

const assigneeOptions = [
  { value: 'Tom Team', label: 'Tom Team' },
  { value: 'Tuấn Trần', label: 'Tuấn Trần' },
  { value: 'Công', label: 'Công' },
]

const deliveryOptions = [
  { value: 'Deliveried', label: 'Deliveried' },
  { value: 'Running', label: 'Running' },
]

const paymentStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Free', label: 'Free' },
  { value: 'Canceled', label: 'Canceled' },
]

const invoiceStatusColorMap: Record<string, string> = {
  Invoice: 'blue',
  Paid: 'green',
  Cancel: 'red',
  Free: 'default',
}

const statusColorMap: Record<string, string> = {
  Assigned: 'blue',
  'Not Yet': 'orange',
  'Pass Test': 'green',
  'Fail Test': 'red',
  Cancel: 'default',
}

const deliveryColorMap: Record<string, string> = {
  Deliveried: 'green',
  Running: 'blue',
}

const paymentStatusColorMap: Record<string, string> = {
  Pending: 'orange',
  Paid: 'green',
  Free: 'default',
  Canceled: 'red',
}

const initialData: Order[] = [
  {
    key: '1',
    date: '2026-03-20',
    client: 'ICS Digital',
    pm: 'Sarah',
    webPo: 'WEB-2026-001',
    invoiceStatus: 'Invoice',
    service: 'Job',
    field: 'Legal',
    amount: 1500,
    taskNo: 'TN-001',
    status: 'Assigned',
    assignee: 'Tuấn Trần',
    deadline: '3pm 25/3',
    note: 'Urgent - legal contract translation',
    delivery: 'Running',
    cost: 800,
    paymentStatus: 'Pending',
  },
  {
    key: '2',
    date: '2026-03-18',
    client: 'Maxsun',
    pm: 'John',
    webPo: 'PO-4521',
    invoiceStatus: 'Paid',
    service: 'Job',
    field: 'Medical',
    amount: 2300,
    taskNo: 'TN-002',
    status: 'Pass Test',
    assignee: 'Tom Team',
    deadline: 'noon 22/3',
    note: 'Medical device manual',
    delivery: 'Deliveried',
    cost: 1200,
    paymentStatus: 'Paid',
  },
  {
    key: '3',
    date: '2026-03-21',
    client: 'Clever Translation',
    pm: 'Emily',
    webPo: 'WEB-2026-003',
    invoiceStatus: 'Free',
    service: 'Test',
    field: 'IT',
    amount: 0,
    taskNo: 'TN-003',
    status: 'Not Yet',
    assignee: 'Công',
    deadline: 'ASAP',
    note: 'Free test task for new client',
    delivery: 'Running',
    cost: 0,
    paymentStatus: 'Free',
  },
  {
    key: '4',
    date: '2026-03-15',
    client: 'Aplus',
    pm: 'David',
    webPo: 'PO-8834',
    invoiceStatus: 'Cancel',
    service: 'Job',
    field: 'Marketing',
    amount: 900,
    taskNo: 'TN-004',
    status: 'Cancel',
    assignee: 'Tuấn Trần',
    deadline: '5pm 20/3',
    note: 'Client cancelled the project',
    delivery: 'Running',
    cost: 0,
    paymentStatus: 'Canceled',
  },
  {
    key: '5',
    date: '2026-03-22',
    client: 'Talking China',
    pm: 'Lisa',
    webPo: 'WEB-2026-005',
    invoiceStatus: 'Invoice',
    service: 'Job',
    field: 'Gaming',
    amount: 3500,
    taskNo: 'TN-005',
    status: 'Assigned',
    assignee: 'Tom Team',
    deadline: '3pm 30/3',
    note: 'Game localization - Vietnamese',
    delivery: 'Running',
    cost: 1800,
    paymentStatus: 'Pending',
  },
]

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
  const [data, setData] = useState<Order[]>(initialData)
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
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              name="client"
              label="Client"
              rules={[{ required: true, message: 'Chọn client' }]}
            >
              <Select
                showSearch
                options={clientOptions}
                placeholder="Chọn client"
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
              <Input placeholder="Project Manager" />
            </Form.Item>

            <Form.Item name="webPo" label="Web/PO">
              <Input placeholder="Web/PO number" />
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
              <Input placeholder="Field" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Nhập amount' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
            </Form.Item>

            <Form.Item name="taskNo" label="Task No">
              <Input placeholder="Task number" />
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
              <Input placeholder="Ex: 3pm 30/12, noon 7/1, ASAP" />
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
              <Input.TextArea rows={2} placeholder="Ghi chú" />
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

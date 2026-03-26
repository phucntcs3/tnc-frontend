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
  message,
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
import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from '../hooks/useOrders'
import {
  useOrderStatuses,
  useDeliveryStatuses,
  usePaymentStatuses,
  usePMs,
  useInvoiceStatuses,
  useServices,
  useFields,
} from '../hooks/useOrderMetadata'
import { useClients } from '@/features/clients/hooks/useClients'
import { useUsers } from '@/features/users/hooks/useUsers'
import { ITEM_PER_PAGE } from '@/constants'

interface OrderFormValues {
  date: Dayjs
  client: number
  pm: number
  webPo: string
  invoiceStatus: number
  service: number
  field: number
  amount: number
  taskNo: string
  status: number
  assignee: number
  deadlineAt: Dayjs
  deadlineNote: string
  note: string
  delivery: number
  cost: number
  paymentStatus: number
}

function OrderPage() {
  const { data = [], isLoading } = useOrders()
  const { data: clients = [] } = useClients()
  const { data: users = [] } = useUsers()
  const { data: orderStatuses = [] } = useOrderStatuses()
  const { data: deliveryStatuses = [] } = useDeliveryStatuses()
  const { data: paymentStatuses = [] } = usePaymentStatuses()
  const { data: pms = [] } = usePMs()
  const { data: invoiceStatuses = [] } = useInvoiceStatuses()
  const { data: services = [] } = useServices()
  const { data: fields = [] } = useFields()
  const createOrder = useCreateOrder()
  const updateOrderMutation = useUpdateOrder()
  const deleteOrder = useDeleteOrder()
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
      date: dayjs(record.date),
      client: record.client?.id,
      pm: record.pm?.id,
      webPo: record.webPo ?? undefined,
      invoiceStatus: record.invoiceStatus?.id,
      service: record.service?.id,
      field: record.field?.id,
      amount: record.amount,
      taskNo: record.taskNo ?? undefined,
      status: record.orderStatus?.id,
      assignee: record.user?.id,
      deadlineAt: record.deadlineAt ? dayjs(record.deadlineAt) : undefined,
      deadlineNote: record.deadlineNote ?? undefined,
      delivery: record.deliveryStatus?.id,
      cost: record.cost,
      paymentStatus: record.paymentStatus?.id,
      note: record.note ?? undefined,
    })
    setModalOpen(true)
  }

  const openDetail = (record: Order) => {
    setViewingOrder(record)
    setDetailOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteOrder.mutate(id, {
      onSuccess: () => message.success('Xoá đơn hàng thành công'),
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Xoá đơn hàng thất bại'
        message.error(msg)
      },
    })
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      const payload: Record<string, unknown> = {
        date: values.date.format('YYYY-MM-DD'),
        client_id: values.client,
        pm_id: values.pm,
        web_po: values.webPo,
        invoice_status_id: values.invoiceStatus,
        service_id: values.service,
        field_id: values.field,
        amount: values.amount,
        task_no: values.taskNo,
        order_status_id: values.status,
        user_id: values.assignee,
        deadline_at: values.deadlineAt ? values.deadlineAt.format('YYYY-MM-DD') : undefined,
        deadline_note: values.deadlineNote,
        delivery_status_id: values.delivery,
        cost: values.cost,
        payment_status_id: values.paymentStatus,
        note: values.note,
      }

      const onSuccess = () => {
        message.success(editingOrder ? 'Cập nhật đơn hàng thành công' : 'Tạo đơn hàng thành công')
        setModalOpen(false)
        form.resetFields()
      }
      const onError = (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Lưu đơn hàng thất bại'
        message.error(msg)
      }

      if (editingOrder) {
        updateOrderMutation.mutate({ id: editingOrder.id, data: payload }, { onSuccess, onError })
      } else {
        createOrder.mutate(payload, { onSuccess, onError })
      }
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
      render: (_: unknown, record: Order) => record.client?.name ?? '',
    },
    {
      title: 'PM',
      key: 'pm',
      width: 80,
      render: (_: unknown, record: Order) => record.pm?.name ?? '',
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
        return name ? <Tag color={invoiceStatusColorMap[name]}>{name}</Tag> : ''
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
        ) : ''
      },
    },
    {
      title: 'Field',
      key: 'field',
      width: 100,
      render: (_: unknown, record: Order) => record.field?.name ?? '',
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
        return name ? <Tag color={statusColorMap[name]}>{name}</Tag> : ''
      },
    },
    {
      title: 'Assignee',
      key: 'assignee',
      width: 120,
      render: (_: unknown, record: Order) => record.user?.email ?? '',
    },
    {
      title: 'Deadline',
      key: 'deadline',
      width: 110,
      render: (_: unknown, record: Order) => record.deadlineAt ? record.deadlineAt.split('T')[0] : '',
    },
    {
      title: 'Deadline Note',
      dataIndex: 'deadlineNote',
      key: 'deadlineNote',
      width: 130,
      render: (val: string) => val ?? '',
    },
    {
      title: 'Delivery',
      key: 'delivery',
      width: 100,
      render: (_: unknown, record: Order) => {
        const name = record.deliveryStatus?.name
        return name ? <Tag color={deliveryColorMap[name]}>{name}</Tag> : ''
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
        ) : ''
      },
    },
    {
      title: 'Account',
      key: 'account',
      width: 100,
      render: (_: unknown, record: Order) => record.account?.name ?? '',
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
            onConfirm={() => handleDelete(record.id)}
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
        confirmLoading={createOrder.isPending || updateOrderMutation.isPending}
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
              <Select
                showSearch
                optionFilterProp="label"
                options={clients.map((c) => ({ value: c.id, label: c.name }))}
              />
            </Form.Item>

            <Form.Item
              name="pm"
              label="PM"
              rules={[{ required: true, message: 'Chọn PM' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={pms.map((p) => ({ value: p.id, label: p.name }))}
              />
            </Form.Item>

            <Form.Item name="webPo" label="Web/PO">
              <Input />
            </Form.Item>

            <Form.Item name="invoiceStatus" label="Invoice/Payment Status">
              <Select
                showSearch
                optionFilterProp="label"
                options={invoiceStatuses.map((s) => ({ value: s.id, label: s.name }))}
              />
            </Form.Item>

            <Form.Item
              name="service"
              label="Service"
              rules={[{ required: true, message: 'Chọn service' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={services.map((s) => ({ value: s.id, label: s.name }))}
              />
            </Form.Item>

            <Form.Item name="field" label="Field">
              <Select
                showSearch
                optionFilterProp="label"
                options={fields.map((f) => ({ value: f.id, label: f.name }))}
              />
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
                optionFilterProp="label"
                options={orderStatuses.map((s) => ({ value: s.id, label: s.name }))}
              />
            </Form.Item>

            <Form.Item
              name="assignee"
              label="Assignee"
              rules={[{ required: true, message: 'Chọn assignee' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={users.map((u) => ({ value: u.id, label: u.email }))}
              />
            </Form.Item>

            <Form.Item name="deadlineAt" label="Deadline Date">
              <DatePicker placeholder='' className="w-full" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="deadlineNote" label="Deadline Note">
              <Input />
            </Form.Item>

            <Form.Item name="delivery" label="Delivery">
              <Select
                showSearch
                optionFilterProp="label"
                options={deliveryStatuses.map((s) => ({ value: s.id, label: s.name }))}
              />
            </Form.Item>

            <Form.Item name="cost" label="Cost">
              <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
            </Form.Item>

            <Form.Item name="paymentStatus" label="Payment Status (Linguists)">
              <Select
                showSearch
                optionFilterProp="label"
                options={paymentStatuses.map((s) => ({ value: s.id, label: s.name }))}
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
              <div className="font-medium">{viewingOrder.client?.name ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">PM</span>
              <div className="font-medium">{viewingOrder.pm?.name ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Web/PO</span>
              <div className="font-medium">{viewingOrder.webPo ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Invoice Status</span>
              <div>{viewingOrder.invoiceStatus ? <Tag color={invoiceStatusColorMap[viewingOrder.invoiceStatus.name]}>{viewingOrder.invoiceStatus.name}</Tag> : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Service</span>
              <div>{viewingOrder.service ? <Tag color={viewingOrder.service.name === 'Job' ? 'blue' : 'purple'}>{viewingOrder.service.name}</Tag> : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Field</span>
              <div className="font-medium">{viewingOrder.field?.name ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Amount</span>
              <div className="font-medium">${viewingOrder.amount.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Task No</span>
              <div className="font-medium">{viewingOrder.taskNo ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Status</span>
              <div>{viewingOrder.orderStatus ? <Tag color={statusColorMap[viewingOrder.orderStatus.name]}>{viewingOrder.orderStatus.name}</Tag> : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Assignee</span>
              <div className="font-medium">{viewingOrder.user?.email ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Deadline Date</span>
              <div className="font-medium">{viewingOrder.deadlineAt ? viewingOrder.deadlineAt.split('T')[0] : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Deadline Note</span>
              <div className="font-medium">{viewingOrder.deadlineNote ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Delivery</span>
              <div>{viewingOrder.deliveryStatus ? <Tag color={deliveryColorMap[viewingOrder.deliveryStatus.name]}>{viewingOrder.deliveryStatus.name}</Tag> : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Cost</span>
              <div className="font-medium">{viewingOrder.cost.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Payment Status</span>
              <div>{viewingOrder.paymentStatus ? <Tag color={paymentStatusColorMap[viewingOrder.paymentStatus.name]}>{viewingOrder.paymentStatus.name}</Tag> : ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Account</span>
              <div className="font-medium">{viewingOrder.account?.name ?? ''}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Exchange Rate</span>
              <div className="font-medium">{viewingOrder.exchangeRate.toLocaleString()}</div>
            </div>
            <div className="col-span-3">
              <span className="text-gray-500 text-sm">Note</span>
              <div className="font-medium">{viewingOrder.note || ''}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrderPage

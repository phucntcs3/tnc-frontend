import { Button, Table, Tag, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useClients } from '../hooks/useClients'
import { ITEM_PER_PAGE } from '@/constants'
import type { Client, Rate } from '../data'
import type { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'

interface ClientRow {
  key: string
  client: Client
  rate: Rate | null
  rowSpan: number
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
    title: 'Email',
    key: 'email',
    ...withRowSpan((row) => row.client.email ?? ''),
  },
  {
    title: 'Thanh toán',
    key: 'paymentTerms',
    ...withRowSpan((row) => (row.client.paymentTerms ? `${row.client.paymentTerms} ngày` : '')),
  },
  {
    title: 'Account',
    key: 'account',
    render: (_: unknown, row: ClientRow) => row.rate?.account.name ?? '',
  },
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
    ...withRowSpan(() => (
      <Space>
        <Button type="link" size="small" icon={<EditOutlined />} />
        <Button type="link" size="small" danger icon={<DeleteOutlined />} />
      </Space>
    )),
  },
]

function ClientPage() {
  const { data = [], isLoading } = useClients()
  const rows = useMemo(() => flattenClients(data), [data])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Khách hàng</h2>
        <Button type="primary" icon={<PlusOutlined />}>
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
    </div>
  )
}

export default ClientPage

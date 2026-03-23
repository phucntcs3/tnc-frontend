export interface User {
  key: string
  id: number
  email: string
  isActive: boolean
  isFirstLogin: boolean
  roleId: number
  roleName: string
  accountId: number | null
  createdAt: string
}

export const roleOptions = [
  { value: 1, label: 'Super Admin' },
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Sale' },
  { value: 4, label: 'Assignee' },
]

export const roleColorMap: Record<string, string> = {
  'Super Admin': 'red',
  Admin: 'blue',
  Sale: 'green',
  Assignee: 'orange',
}

export const mockUsers: User[] = [
  {
    key: '1',
    id: 1,
    email: 'superadmin@gmail.com',
    isActive: true,
    isFirstLogin: true,
    roleId: 1,
    roleName: 'Super Admin',
    accountId: 1,
    createdAt: '2026-03-20',
  },
  {
    key: '2',
    id: 2,
    email: 'admin@gmail.com',
    isActive: true,
    isFirstLogin: true,
    roleId: 2,
    roleName: 'Admin',
    accountId: 2,
    createdAt: '2026-03-20',
  },
  {
    key: '3',
    id: 3,
    email: 'sale@gmail.com',
    isActive: true,
    isFirstLogin: true,
    roleId: 3,
    roleName: 'Sale',
    accountId: 3,
    createdAt: '2026-03-21',
  },
  {
    key: '4',
    id: 4,
    email: 'assignee@gmail.com',
    isActive: true,
    isFirstLogin: true,
    roleId: 4,
    roleName: 'Assignee',
    accountId: null,
    createdAt: '2026-03-22',
  },
]

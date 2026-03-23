export interface AccountUser {
  id: number
  email: string
  isActive: boolean
  roleId: number
}

export interface Account {
  key: string
  id: number
  name: string
  description: string | null
  note: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  users: AccountUser[]
}

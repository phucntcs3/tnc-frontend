export interface UserAccount {
  id: number
  name: string
  description: string | null
  note: string | null
  isActive: boolean
}

export interface User {
  key: string
  id: number
  email: string
  isActive: boolean
  isFirstLogin: boolean
  roleId: number
  createdAt: string
  accounts: UserAccount[]
}

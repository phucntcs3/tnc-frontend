export interface User {
  key: string
  id: number
  email: string
  isActive: boolean
  isFirstLogin: boolean
  roleId: number
  accountId: number | null
  createdAt: string
}

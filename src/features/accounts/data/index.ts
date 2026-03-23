export interface Account {
  key: string
  id: number
  name: string
  description: string | null
  note: string | null
  userId: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

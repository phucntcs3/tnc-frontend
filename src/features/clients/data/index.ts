export interface Rate {
  id: number
  amount: string
  minAmount: string
  note: string | null
  sourceLang: string | null
  targetLang: string | null
  serviceType: { id: number; name: string; code: string }
  unit: { id: number; name: string }
  currency: { id: number; name: string; code: string }
  account: { id: number; name: string } | null
  sale: { id: number; email: string } | null
}

export interface Client {
  key: string
  id: number
  name: string
  description: string | null
  note: string | null
  isActive: boolean
  location: string | null
  website: string | null
  email: string | null
  paymentTerms: number | null
  establishedAt: string | null
  createdAt: string
  rates: Rate[]
}

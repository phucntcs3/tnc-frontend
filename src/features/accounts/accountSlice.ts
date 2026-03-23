import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Account {
  key: string
  username: string
  fullName: string
  role: string
  status: string
}

interface AccountState {
  accounts: Account[]
}

const initialState: AccountState = {
  accounts: [],
}

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload
    },
    addAccount(state, action: PayloadAction<Account>) {
      state.accounts.push(action.payload)
    },
    updateAccount(state, action: PayloadAction<Account>) {
      const index = state.accounts.findIndex((a) => a.key === action.payload.key)
      if (index !== -1) state.accounts[index] = action.payload
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter((a) => a.key !== action.payload)
    },
  },
})

export const { setAccounts, addAccount, updateAccount, removeAccount } = accountSlice.actions
export default accountSlice.reducer

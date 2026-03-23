import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from './data'

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload)
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((u) => u.key === action.payload.key)
      if (index !== -1) state.users[index] = action.payload
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.key !== action.payload)
    },
  },
})

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions
export default userSlice.reducer

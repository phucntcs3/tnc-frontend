import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Client {
  key: string
  name: string
  contact: string
  phone: string
  status: string
}

interface ClientState {
  clients: Client[]
}

const initialState: ClientState = {
  clients: [],
}

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload
    },
    addClient(state, action: PayloadAction<Client>) {
      state.clients.push(action.payload)
    },
    updateClient(state, action: PayloadAction<Client>) {
      const index = state.clients.findIndex((c) => c.key === action.payload.key)
      if (index !== -1) state.clients[index] = action.payload
    },
    removeClient(state, action: PayloadAction<string>) {
      state.clients = state.clients.filter((c) => c.key !== action.payload)
    },
  },
})

export const { setClients, addClient, updateClient, removeClient } = clientSlice.actions
export default clientSlice.reducer

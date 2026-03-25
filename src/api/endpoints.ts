export const ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',

  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,

  ACCOUNTS: '/accounts',
  ACCOUNT_BY_ID: (id: number) => `/accounts/${id}`,

  ROLES: '/roles',

  CLIENTS: '/clients',
  CLIENT_BY_ID: (id: number) => `/clients/${id}`,
}

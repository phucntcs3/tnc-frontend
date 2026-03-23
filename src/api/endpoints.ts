export const ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',

  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,

  ACCOUNTS: '/accounts',
  ACCOUNT_BY_ID: (id: number) => `/accounts/${id}`,

  ROLES: '/roles',
}

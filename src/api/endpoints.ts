export const ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',

  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  ASSIGNEES: '/users/assignees',

  ACCOUNTS: '/accounts',
  ACCOUNT_BY_ID: (id: number) => `/accounts/${id}`,

  ROLES: '/roles',

  CLIENTS: '/clients',
  CLIENT_BY_ID: (id: number) => `/clients/${id}`,

  ORDERS: '/orders',
  ORDER_BY_ID: (id: number) => `/orders/${id}`,

  PMS: '/pms',
  PM_BY_ID: (id: number) => `/pms/${id}`,

  ORDER_METADATA_ORDER_STATUSES: '/order-metadata/order-statuses',
  ORDER_METADATA_DELIVERY_STATUSES: '/order-metadata/delivery-statuses',
  ORDER_METADATA_PAYMENT_STATUSES: '/order-metadata/payment-statuses',
  ORDER_METADATA_PMS: '/order-metadata/pms',
  ORDER_METADATA_INVOICE_STATUSES: '/order-metadata/invoice-statuses',
  ORDER_METADATA_SERVICES: '/order-metadata/services',
  ORDER_METADATA_FIELDS: '/order-metadata/fields',
}

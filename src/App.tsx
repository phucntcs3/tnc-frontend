import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import MainLayout from './layouts/MainLayout'
import LoginPage from './features/auth/components/LoginPage'
import ForgotPasswordPage from './features/auth/components/ForgotPasswordPage'
import ResetPasswordPage from './features/auth/components/ResetPasswordPage'
import DashboardPage from './features/dashboard/components/DashboardPage'
import OrderPage from './features/orders/components/OrderPage'
import UserPage from './features/users/components/UserPage'
import AccountPage from './features/accounts/components/AccountPage'
import ClientPage from './features/clients/components/ClientPage'
import RolePage from './features/roles/components/RolePage'

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/role" element={<RolePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

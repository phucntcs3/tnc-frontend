import { Menu } from 'antd'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/authSlice'

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/orders',
    icon: <ShoppingCartOutlined />,
    label: 'Đơn hàng',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: '/accounts',
    icon: <LockOutlined />,
    label: 'Accounts',
  },
  {
    key: '/clients',
    icon: <TeamOutlined />,
    label: 'Khách hàng',
  },
  {
    key: '/roles',
    icon: <SafetyCertificateOutlined />,
    label: 'Roles',
  },
]

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const siderWidth = collapsed ? 80 : 220

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ width: siderWidth, height: '100vh', position: 'fixed', left: 0, top: 0, overflow: 'auto', background: '#1677ff', transition: 'width 0.2s' }}>
        <div className="h-16 flex items-center justify-between px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          {!collapsed && (
            <span className="text-xl font-bold text-white">
              TNC
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 18, padding: 4, margin: collapsed ? '0 auto' : 0 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="sidebar-menu border-r-0 mt-2"
            style={{ background: 'transparent', flex: 1 }}
          />
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '8px 0' }}>
            <Menu
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              selectedKeys={[location.pathname]}
              items={[
                // {
                //   key: '/settings',
                //   icon: <SettingOutlined />,
                //   label: 'Cài đặt',
                // },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Đăng xuất',
                },
              ]}
              onClick={({ key }) => {
                if (key === 'logout') {
                  dispatch(logout())
                  navigate('/login')
                } else {
                  navigate(key)
                }
              }}
              className="sidebar-menu border-r-0"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: siderWidth, transition: 'margin-left 0.2s' }}>
        <div className="p-6 bg-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout

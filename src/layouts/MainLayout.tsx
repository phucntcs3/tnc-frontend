import { Menu } from 'antd'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/order',
    icon: <ShoppingCartOutlined />,
    label: 'Đơn hàng',
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: '/account',
    icon: <LockOutlined />,
    label: 'Accounts',
  },
  {
    key: '/client',
    icon: <TeamOutlined />,
    label: 'Khách hàng',
  },
]

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
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
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="sidebar-menu border-r-0 mt-2"
          style={{ background: 'transparent' }}
        />
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

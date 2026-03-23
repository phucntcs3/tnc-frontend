import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout

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

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={220} theme="light" className="border-r border-gray-200" style={{ height: '100vh', position: 'fixed', left: 0, top: 0, overflow: 'auto' }}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-xl font-bold" style={{ color: '#1677ff' }}>
            TNC
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="border-r-0 mt-2"
        />
      </Sider>
      <Layout style={{ marginLeft: 220 }}>
        <Content className="p-6 bg-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout

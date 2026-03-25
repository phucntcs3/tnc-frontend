import { Button, Form, Input, Typography, message } from 'antd'
import { useLogin } from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { setToken } from '../authSlice'
import { useNavigate, Link } from 'react-router-dom'

const { Title } = Typography

interface LoginForm {
  email: string
  password: string
}

function LoginPage() {
  const login = useLogin()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = (values: LoginForm) => {
    login.mutate(values, {
      onSuccess: (data) => {
        if (!data.success) {
          message.error(data.message)
          return
        }
        dispatch(setToken(data.data.access_token))
        navigate('/dashboard')
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <Title level={3} className="mb-6! text-center">
          Đăng nhập
        </Title>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>

          <div className="mb-4 text-right">
            <Link to="/forgot-password">
              <Button type="link" className="p-0!">
                Quên mật khẩu?
              </Button>
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={login.isPending}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage

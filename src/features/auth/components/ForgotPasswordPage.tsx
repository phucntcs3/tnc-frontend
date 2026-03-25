import { Button, Form, Input, Typography, Result } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPassword } from '../hooks/useAuth'

const { Title } = Typography

function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword()
  const [submitted, setSubmitted] = useState(false)

  const onFinish = (values: { email: string }) => {
    forgotPassword.mutate(values, {
      onSuccess: () => {
        setSubmitted(true)
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {submitted ? (
          <Result
            status="success"
            title="Đã gửi yêu cầu"
            subTitle="Vui lòng kiểm tra email và làm theo hướng dẫn để khôi phục mật khẩu"
            extra={
              <Link to="/login">
                <Button type="primary">Quay lại đăng nhập</Button>
              </Link>
            }
          />
        ) : (
          <>
            <Title level={3} className="mb-6! text-center">
              Quên mật khẩu
            </Title>

            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={forgotPassword.isPending}
                >
                  Gửi yêu cầu
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center">
              <Link to="/login">Quay lại đăng nhập</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage

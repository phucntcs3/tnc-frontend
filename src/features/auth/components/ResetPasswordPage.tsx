import { Button, Form, Input, Typography, Result, message } from 'antd'
import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useResetPassword } from '../hooks/useAuth'

const { Title } = Typography

interface ResetForm {
  new_password: string
  confirm_password: string
}

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const resetPassword = useResetPassword()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Result
          status="error"
          title="Link không hợp lệ"
          subTitle="Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn."
          extra={
            <Link to="/login">
              <Button type="primary">Quay lại đăng nhập</Button>
            </Link>
          }
        />
      </div>
    )
  }

  const onFinish = (values: ResetForm) => {
    resetPassword.mutate(
      { token, new_password: values.new_password },
      {
        onSuccess: (data) => {
          if (data.success) {
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
          } else {
            message.error(data.message)
          }
        },
      },
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {success ? (
          <Result
            status="success"
            title="Đặt lại mật khẩu thành công"
            subTitle="Bạn sẽ được chuyển đến trang đăng nhập trong giây lát..."
            extra={
              <Link to="/login">
                <Button type="primary">Đăng nhập ngay</Button>
              </Link>
            }
          />
        ) : (
          <>
            <Title level={3} className="mb-6! text-center">
              Đặt lại mật khẩu
            </Title>

            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="Mật khẩu mới"
                name="new_password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                ]}
              >
                <Input.Password size="large" placeholder="Mật khẩu mới" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirm_password"
                dependencies={['new_password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('Mật khẩu xác nhận không khớp'),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={resetPassword.isPending}
                >
                  Đặt lại mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage

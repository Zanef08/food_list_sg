import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Button, Card, Typography, Alert } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { login } from "../store/slices/authSlice"
import { useNavigate, Navigate } from "react-router-dom"

const { Title, Text } = Typography

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  const onFinish = (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate("/")
      })
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Đăng nhập</Title>
          <Text type="secondary">Vui lòng đăng nhập để tiếp tục</Text>
        </div>

        {error && (
          <Alert message="Lỗi đăng nhập" description={error} type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">Tài khoản demo: username: admin, password: password</Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage


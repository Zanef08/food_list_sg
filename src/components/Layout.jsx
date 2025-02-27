import { Layout as AntLayout, Menu, Button, Typography, Dropdown, Avatar } from "antd"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { HomeOutlined, LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons"
import { logout } from "../store/slices/authSlice"

const { Header, Content, Footer } = AntLayout
const { Title } = Typography

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>

          <Menu mode="horizontal" defaultSelectedKeys={["home"]} style={{ border: "none" }}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Trang Chủ
            </Menu.Item>
          </Menu>
        </div>

        <div>
          {isAuthenticated ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button type="text">
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                {user?.name || "Người Dùng"}
                <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
              </Button>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Đăng Nhập
            </Button>
          )}
        </div>
      </Header>

      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "4px",
            minHeight: "calc(100vh - 170px)",
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: "center", background: "#fff" }}>
        Zane ©{new Date().getFullYear()}
      </Footer>
    </AntLayout>
  )
}

export default Layout


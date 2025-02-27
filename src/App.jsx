import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { store } from "./store"

// Components
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import FoodDetailPage from "./pages/FoodDetailPage"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff4d4f",
            borderRadius: 6,
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/food/:id"
                element={
                  <ProtectedRoute>
                    <FoodDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  )
}

export default App


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { message } from "antd"

const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "password") {
        resolve({
          user: {
            id: 1,
            username: "admin",
            name: "Zane",
          },
          token: "mock-jwt-token",
        })
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials)
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  return null
})

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        message.success("Đăng nhập thành công!")
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        message.error("Đăng nhập thất bại: " + action.payload)
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        message.success("Đã đăng xuất thành công")
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer


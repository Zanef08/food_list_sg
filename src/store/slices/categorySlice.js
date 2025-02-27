import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { message } from "antd"

const mockCategories = [
    { id: 1, name: "Phở", description: "Phở bò, phở gà và các loại phở đặc biệt" },
    { id: 2, name: "Bún", description: "Bún riêu, bún bò, bún chả, bún đậu" },
    { id: 3, name: "Mì", description: "Mì quảng, mì Hàn, mì Ý, mì xào" },
    { id: 4, name: "Cơm", description: "Cơm tấm, cơm chiên, cơm văn phòng" },
    { id: 5, name: "Bánh mì", description: "Bánh mì thịt, bánh mì chảo, bánh mì kẹp" },
    { id: 6, name: "Fast food", description: "Hamburger, gà rán, khoai tây chiên" },
    { id: 7, name: "Lẩu", description: "Lẩu Thái, lẩu Trung Quốc, lẩu nướng" },
    { id: 8, name: "BBQ", description: "Nướng Hàn Quốc, nướng Nhật, nướng Việt Nam" },
    { id: 9, name: "Sushi", description: "Sushi, sashimi và các món Nhật truyền thống" },
    { id: 10, name: "Dimsum", description: "Há cảo, xíu mại, bánh bao" },
    { id: 11, name: "Bánh ngọt", description: "Bánh flan, bánh tiramisu, bánh kem" },
    { id: 12, name: "Trà sữa", description: "Trà sữa trân châu và các loại đồ uống" },
    { id: 13, name: "Ăn vặt", description: "Các món ăn vặt đường phố" },
    { id: 14, name: "Cháo", description: "Cháo lòng, cháo sườn, cháo gà" },
    { id: 15, name: "Món Thái", description: "Tom yum, pad thai, các món Thái đặc trưng" },
    { id: 16, name: "Steak", description: "Bít tết, sườn nướng và các món thịt bò" },
    { id: 17, name: "Hải sản", description: "Hải sản tươi sống, hải sản nướng" },
    { id: 18, name: "Bánh cuốn", description: "Bánh cuốn, bánh ướt các loại" },
    { id: 19, name: "Xôi", description: "Xôi mặn, xôi ngọt các loại" },
    { id: 20, name: "Pizza", description: "Pizza Ý và fusion" }
  ]

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCategories)
      }, 500)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  categories: [],
  loading: false,
  error: null,
}

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        message.error("Không thể tải danh mục: " + action.payload)
      })
  },
})

export default categorySlice.reducer


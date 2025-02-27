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

const mockFoodData = [
  {
    id: 1,
    name: "Mì Quảng Phú Chiêm",
    district: 24, 
    address: "250 Đ. Hoàng Diệu 2, Phường Linh Trung, Thủ Đức, Hồ Chí Minh",
    description: "Mì Quảng truyền thống với nước dùng đậm đà",
    price: 50000, 
    popularity: 4.6, 
    foodType: "wet", 
    country: "Vietnam",
    categoryId: 3, 
    imageUrl: "https://img.mservice.com.vn/common/u/2e02fb5fe4f64fb55bc713540643c6f8eae702d101cea8c59afc49cfc505fc37/99b9097c-0119-4ab6-bac3-026ccb8c0d6aovfbz2pj.jpeg",
  },
  {
    id: 2,
    name: "Bún Quậy Phú Quốc",
    district: 24, 
    address: "1250 Kha Vạn Cân, P. Linh Trung, Tp. Thủ Đức, TP. HCM",
    description: "Bún đặc sản Phú Quốc với hải sản tươi ngon",
    price: 55000,
    popularity: 4.5, 
    foodType: "wet", 
    country: "Vietnam",
    categoryId: 2,
    imageUrl: "https://reviewvilla.vn/wp-content/uploads/2021/12/bun-quay-phu-quoc-9.jpg",
  },
  {
    id: 3,
    name: "Mì Sủi Cảo Gia An 3",
    district: 24,
    address: "54 Chương Dương, Linh Chiểu, Thủ Đức, Hồ Chí Minh",
    description: "Mì sủi cảo với nhân thịt thơm ngon",
    price: 55000, 
    popularity: 4.4,
    foodType: "wet",
    country: "Vietnam",
    categoryId: 3, 
    imageUrl: "https://mms.img.susercontent.com/vn-11134517-7r98o-lr76tv668pehd0@resize_ss400x400!@crop_w400_h400_cT",
  },
  {
    id: 4,
    name: "Mì Cay Koreno",
    district: 24,
    address: "105 Hoàng Diệu 2, Linh Trung, Thủ Đức, Hồ Chí Minh",
    description: "Mì cay theo phong cách Hàn Quốc",
    price: 75000, 
    popularity: 4.0, 
    foodType: "wet", 
    country: "Korea",
    categoryId: 3, 
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Uk2uawDln8bqxZ3SzpAOgc1SKk6INk6-232-Ge8wFQYfgDracqMiRJNNPDoR4_y7has&usqp=CAU",
  },
  {
    id: 5,
    name: "Mì Ramen Eno",
    district: 24,
    address: "54E Hoàng Diệu 2, Linh Chiểu, Thủ Đức",
    description: "Ramen Nhật Bản với nước dùng đậm đà",
    price: 200000, 
    popularity: 4.6, 
    foodType: "wet",
    country: "Japan",
    categoryId: 3, 
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBlNFqX-5S7vQJc_wRg9vNRtqRVaeMv_QL0JhqDJhgW3XhA5NWsx9FNTh6BjR6TKqmB0&usqp=CAU",
  },
  {
    id: 6,
    name: "Meat & Meet",
    district: 24,
    address: "Vincom Lê Văn Việt",
    description: "Nhà hàng steak cao cấp",
    price: 500000, 
    popularity: 4.8, 
    foodType: "dry", 
    country: "Western",
    categoryId: 16,
    imageUrl: "https://mia.vn/media/uploads/blog-du-lich/meat-and-meet-07-1693641095.jpg",
  },
  {
    id: 7,
    name: "Bún bò Phong Béo",
    district: 24,
    address: "61 Dân Chủ, Bình Thọ, Thủ Đức, Hồ Chí Minh",
    description: "Bún bò Huế đậm đà, nước dùng thơm ngon",
    price: 40000, 
    popularity: 4.5,
    foodType: "wet",
    country: "Vietnam",
    categoryId: 2,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipP0vwXjRsqQbLtAib5AWI_nbBsxGpp8Bq2ILcwP=s1360-w1360-h1020",
  },
  {
    id: 8,
    name: "Bánh Ướt Lòng Gà Minh",
    district: 24,
    address: "877a Đ. Kha Vạn Cân, Linh Chiểu, Thủ Đức, Hồ Chí Minh",
    description: "Bánh ướt với nhân lòng gà tươi ngon",
    price: 100000, 
    popularity: 4.4,
    foodType: "dry", 
    country: "Vietnam",
    categoryId: 18, 
    imageUrl: "https://mms.img.susercontent.com/vn-11134513-7r98o-lsv4caecupi193@resize_ss1242x600!@crop_w1242_h600_cT",
  },
  {
    id: 9,
    name: "Phở Khô Gia Lai",
    district: 14, 
    address: "Bình Thạnh, TP.HCM",
    description: "Phở khô đặc sản Gia Lai với nước chấm đặc biệt",
    price: 55000, 
    popularity: 4.6, 
    foodType: "dry", 
    country: "Vietnam",
    categoryId: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3BB0Em8-QYVL_klm24vzynSj27-FcQeE3Q&s",
  },
  {
    id: 10,
    name: "Bánh ướt chồng dĩa",
    district: 14,
    address: "D5, quận Bình Thạnh TP.HCM",
    description: "Bánh ướt đặc sản Buôn Ma Thuột",
    price: 200000, 
    popularity: 4.7,
    foodType: "dry", 
    country: "Vietnam",
    categoryId: 18, 
    imageUrl: "https://mia.vn/media/uploads/blog-du-lich/banh-uot-dia-chong-buon-ma-thuot-1k-1713435399.jpg",
  },
  {
    id: 11,
    name: "Bún riêu Hằng",
    district: 24,
    address: "26 Đ. Hoàng Diệu 2, Linh Chiểu, Thủ Đức, Hồ Chí Minh",
    description: "Bún riêu thơm ngon đậm đà",
    price: 100000,
    popularity: 4.7, 
    foodType: "wet", 
    country: "Vietnam",
    categoryId: 2,
    imageUrl: "https://mms.img.susercontent.com/vn-11134513-7r98o-lsvf0ikx4ngkb6@resize_ss1242x600!@crop_w1242_h600_cT",
  },
  {
    id: 12,
    name: "Cháo Sườn Tân Định",
    district: 3,
    address: "295 Hai Bà Trưng, P. 8, Quận 3, TP. HCM",
    description: "Cháo sườn ngon nổi tiếng Sài Gòn",
    price: 30000, 
    popularity: 4.7, 
    foodType: "wet", 
    country: "Vietnam",
    categoryId: 14,
    imageUrl: "https://kenhhomestay.com/wp-content/uploads/2019/11/Chao-suon-Sai-Gon-3.jpg",
  },
  {
    id: 13,
    name: "Cơm Phát Ký",
    district: 24,
    address: "244 Đ. Hoàng Diệu 2, Linh Chiểu, Thủ Đức, Hồ Chí Minh",
    description: "Cơm xá xíu thơm ngon, đậm đà hương vị",
    price: 60000,
    popularity: 4.7,
    foodType: "dry",
    country: "Vietnam",
    categoryId: 4, 
    imageUrl: "https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwg1vu31b00r89@resize_w800",
  },
  {
    id: 14,
    name: "Bánh flan",
    district: 24, 
    address: "466 Lê Văn Việt, Quận 9, TP. HCM",
    description: "Bánh flan béo mịn, thơm mùi vani",
    price: 18000, 
    popularity: 4.7, 
    foodType: "dry", 
    country: "Vietnam",
    categoryId: 11, 
    imageUrl: "https://superfoods.vn/wp-content/uploads/2023/08/banh-flan.jpg",
  },
  {
    id: 15,
    name: "KFC",
    district: 24,
    address: "Nhiều chi nhánh tại TP.HCM",
    description: "Gà rán Kentucky nổi tiếng toàn cầu",
    price: 100000, 
    popularity: 4.2,
    foodType: "dry", 
    country: "USA",
    categoryId: 6, 
    imageUrl: "https://images.ctfassets.net/9tka4b3550oc/1FQSRLVXt2Q1lvXXkOyW6U/f306561ef7bfc5ab7c84a739a46d3629/Food_09.png?q=75&w=1280",
  },
  {
    id: 16,
    name: "Jollibee",
    district: 24, 
    address: "Nhiều chi nhánh tại TP.HCM",
    description: "Fastfood Philippines với gà rán giòn thơm",
    price: 90000,
    popularity: 4.0,
    foodType: "dry", 
    country: "Philippines",
    categoryId: 6,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS_5w6HRsNLFYdnIfdad4KWhlB-PRdi1OvDQ&s",
  },
  {
    id: 17,
    name: "Haidilao Hotpot",
    district: 24,
    address: "Vincom Đồng Khởi, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP.HCM",
    description: "Chuỗi nhà hàng lẩu Trung Quốc cao cấp với dịch vụ đặc biệt",
    price: 500000,
    popularity: 4.8, 
    foodType: "wet", 
    country: "China",
    categoryId: 7,
    imageUrl: "https://blog.dktcdn.net/files/lau-haidilao.png",
  },
  {
    id: 18,
    name: "Lotteria",
    district: 24, 
    address: "Nhiều chi nhánh tại TP.HCM",
    description: "Chuỗi nhà hàng fastfood Hàn Quốc với các món burger, gà rán",
    price: 80000, 
    popularity: 3.9, 
    foodType: "dry", 
    country: "Korea",
    categoryId: 6, 
    imageUrl: "https://hotdeal.vn/images/uploads/2017/Th%C3%A1ng%204/10/321879-1/321879-body%2520%283%29.jpg",
  },
  {
    id: 19,
    name: "McDonald's",
    district: 24,
    address: "Nhiều chi nhánh tại TP.HCM",
    description: "Chuỗi nhà hàng fastfood nổi tiếng thế giới với burger và khoai tây chiên",
    price: 100000,
    popularity: 4.3, 
    foodType: "dry", 
    country: "USA",
    categoryId: 6, 
    imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/cd75d7049f60668dce04b4d0d4ec172a/0c09274e3b12c8246a05970e1ef9d835.jpeg",
  },
]

export const fetchFoodPlaces = createAsyncThunk("food/fetchFoodPlaces", async (_, { rejectWithValue }) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFoodData)
      }, 500)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

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

export const fetchFoodById = createAsyncThunk("food/fetchFoodById", async (id, { rejectWithValue }) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const food = mockFoodData.find((item) => item.id === Number.parseInt(id))
        if (food) {
          resolve(food)
        } else {
          reject(new Error("Food not found"))
        }
      }, 500)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  foodPlaces: [],
  filteredFoodPlaces: [],
  selectedFood: null,
  filters: {
    district: null,
    foodType: null, 
    country: null,
    categoryId: null,
  },
  loading: false,
  error: null,
}

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredFoodPlaces = state.foodPlaces.filter((food) => {
        if (state.filters.district && food.district !== state.filters.district) {
          return false
        }
        if (state.filters.isLiquid !== null && food.isLiquid !== state.filters.isLiquid) {
          return false
        }
        if (state.filters.country && food.country !== state.filters.country) {
          return false
        }
        if (state.filters.categoryId && food.categoryId !== state.filters.categoryId) {
          return false
        }

        return true
      })
    },
    clearFilters: (state) => {
      state.filters = {
        district: null,
        isLiquid: null,
        country: null,
        categoryId: null,
      }
      state.filteredFoodPlaces = state.foodPlaces
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodPlaces.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFoodPlaces.fulfilled, (state, action) => {
        state.loading = false
        state.foodPlaces = action.payload
        state.filteredFoodPlaces = action.payload
      })
      .addCase(fetchFoodPlaces.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        message.error("Failed to fetch food places: " + action.payload)
      })
      .addCase(fetchFoodById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedFood = action.payload
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        message.error("Failed to fetch food details: " + action.payload)
      })
  },
})

export const { setFilters, clearFilters } = foodSlice.actions
export default foodSlice.reducer
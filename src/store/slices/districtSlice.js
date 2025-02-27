import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const mockDistricts = [
  { id: 1, name: "Quận 1", description: "Trung tâm thành phố với nhiều điểm tham quan" },
  { id: 2, name: "Quận 2", description: "Khu dân cư hiện đại, Thủ Thiêm" },
  { id: 3, name: "Quận 3", description: "Lịch sử, kiến trúc Pháp" },
  { id: 4, name: "Quận 4", description: "Ven sông, nổi tiếng với hải sản" },
  { id: 5, name: "Quận 5", description: "Khu phố Tàu, di sản văn hóa" },
  { id: 6, name: "Quận 6", description: "Chợ Lớn, trung tâm thương mại" },
  { id: 7, name: "Quận 7", description: "Phú Mỹ Hưng, cộng đồng quốc tế" },
  { id: 8, name: "Quận 8", description: "Nhiều kênh rạch, chợ đầu mối" },
  { id: 9, name: "Quận 9", description: "Khu công nghệ cao, Suối Tiên" },
  { id: 10, name: "Quận 10", description: "Chợ địa phương, khu ăn uống" },
  { id: 11, name: "Quận 11", description: "Công viên Đầm Sen" },
  { id: 12, name: "Quận 12", description: "Phát triển nhanh, giáp Bình Dương" },
  { id: 13, name: "Quận Bình Tân", description: "Khu dân cư đông đúc" },
  { id: 14, name: "Quận Bình Thạnh", description: "Sát trung tâm, có Landmark 81" },
  { id: 15, name: "Quận Gò Vấp", description: "Nhiều khu thương mại, đông dân" },
  { id: 16, name: "Quận Phú Nhuận", description: "Gần sân bay, khu ẩm thực" },
  { id: 17, name: "Quận Tân Bình", description: "Sân bay Tân Sơn Nhất" },
  { id: 18, name: "Quận Tân Phú", description: "Phát triển mới, có AEON Mall" },
  { id: 19, name: "Huyện Bình Chánh", description: "Đô thị hóa, vùng ven TP" },
  { id: 20, name: "Huyện Cần Giờ", description: "Biển, rừng ngập mặn" },
  { id: 21, name: "Huyện Củ Chi", description: "Địa đạo Củ Chi, du lịch sinh thái" },
  { id: 22, name: "Huyện Hóc Môn", description: "Trái cây, nông nghiệp" },
  { id: 23, name: "Huyện Nhà Bè", description: "Gần biển, khu đô thị mới" },
  { id: 24, name: "TP Thủ Đức", description: "Khu đô thị sáng tạo" },
];

export const fetchDistricts = createAsyncThunk("districts/fetchDistricts", async (_, { rejectWithValue }) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDistricts);
      }, 500);
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  districts: [],
  loading: false,
  error: null,
};

const districtSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error("Không thể tải danh sách quận: " + action.payload);
      });
  },
});

export default districtSlice.reducer;

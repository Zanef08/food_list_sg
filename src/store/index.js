import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import foodReducer from "./slices/foodSlice"
import categoryReducer from "./slices/categorySlice"
import districtReducer from "./slices/districtSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    categories: categoryReducer,
    districts: districtReducer,
  },
})


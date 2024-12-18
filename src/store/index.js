//结合redux 子模块， 导出store 实例
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './modules/user'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
export default store
// redux中编写获取token的异步获取和同步修改
import { createSlice } from '@reduxjs/toolkit'
import {  request } from '@/utils/request'
import { getToken, setToken} from '@/utils/token'

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken || ''
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.token = action.payload;
      setToken(state.token)
    },
  },
});

// 解构出actionCreater函数
const { setUserInfo} = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法封装
const fetchLogin = (loginForm) => {
    return async dispatch => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setUserInfo(res.data.token))
    }
}
export {
    fetchLogin,
}

export default userReducer
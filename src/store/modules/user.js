// redux中编写获取token的异步获取和同步修改
import { createSlice } from '@reduxjs/toolkit'
import {  request } from '@/utils/request'
import { clearToken, getToken, setToken} from '@/utils/token'

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken || '',
    userInfo: {}
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      setToken(state.token)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {}
      state.token = ''

      clearToken()
    }
  },
});

// 解构出actionCreater函数
const { setUserToken, setUserInfo, clearUserInfo} = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法封装
const fetchLogin = (loginForm) => {
    return async dispatch => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setUserToken(res.data.token))
    }
}

// 获取用户信息
const fetchUserInfo = () => {
  return async dispatch => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }  
}

export {
    fetchLogin,
    fetchUserInfo,
    clearUserInfo
}

export default userReducer
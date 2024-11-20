import axios from "axios";
import { clearToken, getToken } from "./token";
import router from "@/router";

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
});

request.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, err => {
    return Promise.reject(err);
});

request.interceptors.response.use(res => {
    return res.data;
}, err => {
    if (err.response.status === 401) {
        clearToken()
        router.navigate('/login')
        window.location.reload()
    }
    //异常情况，弹出提示：
    //message.error('服务器异常，请稍后再试:' + err)
    return Promise.reject(err);
});

export {request}
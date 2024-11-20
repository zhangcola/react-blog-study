import axios from "axios";
import { getToken } from "./token";

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
    //异常情况，弹出提示：
    //message.error('服务器异常，请稍后再试:' + err)
    return Promise.reject(err);
});

export {request}
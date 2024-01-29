import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' // 导入axios的默认导入
// 导入 axios 类型声明
import type { AxiosInstance,AxiosRequestHeaders,InternalAxiosRequestConfig } from 'axios';
// 样式相关
import 'normalize.css'
import '@/assets/css/index.css'

// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create()
axios.defaults.baseURL = 'http://prod-cn.your-api-server.com'
// 设置 axios
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      }
      Object.assign(config.headers, { Authorization: `Bearer ${jwtToken}` });
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


// 路由相关
import router from '@/routers'

// 状态管理相关
import pinia from '@/storages'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
app.provide<AxiosInstance>('axios', axiosInstance)

import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建axios实例，将来对创建出来的梳理进行自定义配置，这样做不会污染原始的axios
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 自定义配置----一般用于配置请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // --------------------------------------------------------------------
  Toast.loading({
    message: '请求中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 加载图标类型
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失（可以在下面调用Toast.clear方法关闭）
  })

  // --------------------------------------------------------------------
  // 在发送请求之前做些什么
  // --------------------------------------------------------------------
  // 发送请求前添加请求头信息
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  // --------------------------------------------------------------------
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么：默认axios会多包装一层data，需要相应拦截器处理一下

  // --------------------------------------------------------------------
  // 添加拦截器处理错误（要根据具体项目分析）
  const res = response.data
  if (res.status !== 200) {
    // 抛出提示
    Toast(res.message)
    // 抛出错误
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  // --------------------------------------------------------------------
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance

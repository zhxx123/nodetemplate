/*
 * @Author: zhxx
 * @Date: 2020-07-10 10:43:46
 * @LastEditors: zhxx
 * @LastEditTime: 2020-07-10 12:40:58
 */
import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
// import router from '@/router'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/v1/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers.Accept = 'application/json'
      const token = getToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 2002: 登录已经过期;
    if (res.status === 2002) {
      Vue.prototype.$message({
        message: res.msg || 'Error',
        showClose: true,
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken')
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    // console.log('error' + error) // for debug
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          MessageBox.confirm('你已经退出登录, 你可以取消留在当前页面，或者重新登录', '确认登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken')
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            })
          })
          break
        case 403:
          Vue.prototype.$message({
            showClose: true,
            message: '你没有操作权限',
            type: 'warning'
          })
          break
      }
      return Promise.reject(error)
    }
  }
)

export default service

import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/users/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/users/logout',
    method: 'put'
  })
}

// 获取用户登录记录
export function getUserOauthInfo(query) {
  return request({
    url: '/admin/logs/login',
    method: 'get',
    params: query
  })
}


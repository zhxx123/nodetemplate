import service from '@/utils/request'

export function login(data) {
  return service({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return service({
    url: '/admin/users/info',
    method: 'get'
  })
}

export function logout() {
  return service({
    url: '/admin/users/logout',
    method: 'put'
  })
}

// 获取用户登录记录
export function getUserOauthInfo(query) {
  return service({
    url: '/admin/logs/login',
    method: 'get',
    params: query
  })
}


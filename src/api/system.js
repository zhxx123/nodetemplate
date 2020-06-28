import request from '@/utils/request'

export function getSystemBasicInfo(name) {
  return request({
    url: '/admin/sys/basic',
    method: 'get',
    params: name
  })
}

export function getSystemSimpleInfo(query) {
  return request({
    url: '/admin/sys/simple',
    method: 'get',
    params: query
  })
}

// 获取系统设置
export function getAdminSetings(query) {
  return request({
    url: '/admin/settings/list',
    method: 'get',
    params: query
  })
}
// 更新系统设置
export function updateAdminSetings(data) {
  return request({
    url: '/admin/settings/update',
    method: 'put',
    data
  })
}

// 获取git 提交记录

export function getGitLogsInfo(query) {
  return request({
    url: '/admin/logs/github',
    method: 'get',
    params: query
  })
}

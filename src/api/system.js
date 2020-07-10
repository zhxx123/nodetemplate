/*
 * @Author: zhxx
 * @Date: 2020-07-10 10:43:46
 * @LastEditors: zhxx
 * @LastEditTime: 2020-07-10 14:50:35
 */
import service from '@/utils/request'

export function getSystemBasicInfo(name) {
  return service({
    url: '/admin/sys/basic',
    method: 'get',
    params: name
  })
}

export function getSystemSimpleInfo(query) {
  return service({
    url: '/admin/sys/simple',
    method: 'get',
    params: query
  })
}

// 获取系统设置
export function getAdminSetings(query) {
  return service({
    url: '/admin/settings/list',
    method: 'get',
    params: query
  })
}
// 更新系统设置
export function updateAdminSetings(data) {
  return service({
    url: '/admin/settings/update',
    method: 'put',
    data
  })
}

// 获取git 提交记录

export function getGitLogsInfo(query) {
  return service({
    url: '/admin/logs/github',
    method: 'get',
    params: query
  })
}

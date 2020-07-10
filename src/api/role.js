/*
 * @Author: zhxx
 * @Date: 2020-07-10 10:43:46
 * @LastEditors: zhxx
 * @LastEditTime: 2020-07-10 18:46:46
 */
import service from '@/utils/request'

export function getRoles(query) {
  return service({
    url: '/admin/permision/role/list',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return service({
    url: '/admin/permision/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return service({
    url: `/admin/permision/role/update`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return service({
    url: `/admin/permision/role/del`,
    method: 'delete'
  })
}

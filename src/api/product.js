import request from '@/utils/request'

// 获取所有用户列表
export function getProductList(query) {
  return request({
    url: '/admin/commodits/list',
    method: 'get',
    params: query
  })
}

export function addProduct(data) {
  return request({
    url: '/admin/commodits/add',
    method: 'post',
    data
  })
}
export function updateProduct(data) {
  return request({
    url: '/admin/commodits/update',
    method: 'post',
    data
  })
}
export function updateStatusProduct(data) {
  return request({
    url: '/admin/commodits/updatestatus',
    method: 'put',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: `/admin/commodits/${id}`,
    method: 'delete'
  })
}

// 获取矿场机器列表
export function getFarmServerList(query) {
  return request({
    url: '/admin/farms/list',
    method: 'get',
    params: query
  })
}

// 更新矿场订单状态
export function updateFarmOrderStatus(data) {
  return request({
    url: '/admin/farms/order/updatestatus',
    method: 'put',
    data
  })
}
// 更新矿场挖矿配置
export function updateFarmMinerConfig(data) {
  return request({
    url: '/admin/farms/minerconfig/update',
    method: 'put',
    data
  })
}
// 更新订单ID
export function updateFarmUserID(data) {
  return request({
    url: '/admin/farms/userinfo/update',
    method: 'put',
    data
  })
}


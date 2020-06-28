import request from '@/utils/request'

// 获取所有用户订单列表
export function getOrderList(query) {
  return request({
    url: '/admin/orders/list',
    method: 'get',
    params: query
  })
}
// 获取所有矿场订单列表
export function getMinerList(query) {
  return request({
    url: '/admin/orders/miner',
    method: 'get',
    params: query
  })
}

export function addOrder(data) {
  return request({
    url: '/admin/orders/add',
    method: 'post',
    data
  })
}

export function updateOrderStatus(data) {
  return request({
    url: '/admin/orders/updatestatus',
    method: 'put',
    data
  })
}

export function deleteOrder(id) {
  return request({
    url: `/order/${id}`,
    method: 'delete'
  })
}

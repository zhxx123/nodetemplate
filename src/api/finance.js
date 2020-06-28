import request from '@/utils/request'

// 获取所有订单列表
export function getFinanceList(query) {
  return request({
    url: '/finance/list',
    method: 'get',
    params: query
  })
}
// 更新用户订单
export function updateFinance(id, data) {
  return request({
    url: `/finance/update/${id}`,
    method: 'put',
    data
  })
}

// 获取数字货币交易列表
export function getDigitalList(query) {
  return request({
    url: '/admin/digtial/list',
    method: 'get',
    params: query
  })
}
export function getDigitalRecordList(query) {
  return request({
    url: '/admin/digtial/record',
    method: 'get',
    params: query
  })
}
// 更新record 记录
export function UpdateDigitalRecord(data) {
  return request({
    url: '/admin/digtial/update',
    method: 'put',
    data
  })
}
// 获取法币交易列表
export function getLegalList(query) {
  return request({
    url: '/admin/office/list',
    method: 'get',
    params: query
  })
}
// // 更新订单状态
// export function updateOrder(id, data) {
//   return request({
//     url: `/finance/${id}`,
//     method: 'put',
//     data
//   })
// }
// // 删除订单
// export function deleteOrder(id) {
//   return request({
//     url: `/finance/${id}`,
//     method: 'delete'
//   })
// }

// 更新法币列表
export function updateLegal(id, data) {
  return request({
    url: `/finance/${id}`,
    method: 'put',
    data
  })
}
// 更新法币资产
export function updateDigital(id, data) {
  return request({
    url: `/finance/${id}`,
    method: 'put',
    data
  })
}
// // 删除法币记录
// export function deleteLegal(id) {
//   return request({
//     url: `/finance/${id}`,
//     method: 'delete'
//   })
// }
// 获取虚拟货币价格列表
export function getPriceList() {
  return request({
    url: '/admin/coinprice/list',
    method: 'get'
  })
}
// 获取市场虚拟货币价格
export function getCoinPriceSpider(query) {
  return request({
    url: '/admin/coinprice/market',
    method: 'get',
    params: query
  })
}
// 更新虚拟货币价格
export function updateCoinPrice(data) {
  return request({
    url: '/admin/coinprice/update',
    method: 'put',
    data
  })
}
// 更新价格更新方式
export function updateCoinPriceStatus(data) {
  return request({
    url: '/admin/coinprice/updatestatus',
    method: 'put',
    data
  })
}
// 获取钱包基本信息
export function getWalletBasic(query) {
  return request({
    url: '/admin/wallet/basic',
    method: 'get',
    params: query
  })
}
// 获取钱包动态信息
export function getWalletSimpleList(query) {
  return request({
    url: '/admin/wallet/simple',
    method: 'get',
    params: query
  })
}
// 获取钱包地址分配表
export function getAddressRecord(query) {
  return request({
    url: '/admin/wallet/address',
    method: 'get',
    params: query
  })
}
// 分配地址
export function addNewAddress(data) {
  return request({
    url: '/admin/wallet/coinaddr',
    method: 'put',
    data
  })
}
// 获取系统资产汇总
export function getAssetSummary() {
  return request({
    url: '/admin/finances/summary',
    method: 'get'
  })
}
// 获取资产报表
export function getAssetReportList(query) {
  return request({
    url: '/admin/finances/report',
    method: 'get',
    params: query
  })
}
// 添加一条资产报表记录
export function addAssetReport(data) {
  return request({
    url: '/admin/finances/add',
    method: 'post',
    data
  })
}
// 修改报表状态
export function updateAssetReportStatus(data) {
  return request({
    url: '/admin/finances/updatestatus',
    method: 'put',
    data
  })
}
// 获取用户资产流水
export function getUserAssetFlowList(query) {
  return request({
    url: '/admin/asset/flowlist',
    method: 'get',
    params: query
  })
}
// 获取用户资产列表
export function getUserAssetList(query) {
  return request({
    url: '/admin/asset/list',
    method: 'get',
    params: query
  })
}
// 更新单个用户账户状态
export function updateUserAccountStatus(data) {
  return request({
    url: '/admin/asset/accountstatus',
    method: 'put',
    data
  })
}
// 更新所有用户账户状态
export function updateAllUserAccountStatus(data) {
  return request({
    url: '/admin/asset/allaccountstatus',
    method: 'put',
    data
  })
}
// 获取虚拟充值记录
export function getVirtualChargeList(query) {
  return request({
    url: '/admin/virtual/list',
    method: 'get',
    params: query
  })
}
// 添加虚拟充值
export function addVirtualAsset(data) {
  return request({
    url: '/admin/virtual/create',
    method: 'post',
    data
  })
}


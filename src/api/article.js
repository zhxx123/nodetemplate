import request from '@/utils/request'
// 获取文章列表
export function getArticleList(query) {
  return request({
    url: '/admin/article/list',
    method: 'get',
    params: query
  })
}
// 修改文章状态
export function updateArticleStatus(data) {
  return request({
    url: '/admin/article/updatestatus',
    method: 'put',
    data
  })
}
export function fetchList(query) {
  return request({
    url: '/admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(query) {
  return request({
    url: '/admin/article/detail',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/admin/article/add',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/admin/article/update',
    method: 'put',
    data
  })
}

// 获取帮助中心分类
export function getHelpTypeList(query) {
  return request({
    url: '/admin/article/helpcategory/list',
    method: 'get',
    params: query
  })
}
// 添加帮助中心分类
export function addHelpType(data) {
  return request({
    url: '/admin/article/helpcategory/add',
    method: 'post',
    data
  })
}
// 更新帮助中心分类状态
export function updateHelpType(data) {
  return request({
    url: '/admin/article/helpcategory/update',
    method: 'put',
    data
  })
}
// 更新帮助中心分类状态
export function updateStatusHelpType(data) {
  return request({
    url: '/admin/article/helpcategory/updatestatus',
    method: 'put',
    data
  })
}

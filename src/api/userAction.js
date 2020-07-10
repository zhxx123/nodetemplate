import service from '@/utils/request'

// 获取所有用户列表
export function getUserList(query) {
  return service({
    url: '/admin/users/list',
    method: 'get',
    params: query
  })
}
// 添加用户
export function addUser(data) {
  return service({
    url: '/admin/users/add',
    method: 'post',
    data
  })
}
// 更新用户状态
export function updateUserStatus(data) {
  return service({
    url: '/admin/users/update',
    method: 'put',
    data
  })
}
// 更新用户角色
export function updateUserRole(data) {
  return service({
    url: '/admin/users/role/update',
    method: 'put',
    data
  })
}
// 删除用户
export function deleteUser(id) {
  return service({
    url: `/admin/users/${id}`,
    method: 'delete'
  })
}
// 下线用户
export function logoutUser(id) {
  return service({
    url: `/admin/users/logout/${id}`,
    method: 'put'
  })
}
// user 登录记录
export function getLoginRecord(query) {
  return service({
    url: '/admin/users/loginlogs',
    method: 'get',
    params: query
  })
}

// 用户消息记录
export function getUserMessage(query) {
  return service({
    url: '/admin/message/list',
    method: 'get',
    params: query
  })
}
// 更新用户消息状态
export function updateMessageStatus(data) {
  return service({
    url: '/admin/message/updatestatus',
    method: 'put',
    data
  })
}
// 更新用户消息
export function updateMessage(data) {
  return service({
    url: '/admin/message/update',
    method: 'put',
    data
  })
}
// 更新用户基本信息
export function updateUserInfo(data) {
  return service({
    url: '/admin/users/update/info',
    method: 'put',
    data
  })
}

// 管理员列表
export function getAdminList(query) {
  return service({
    url: '/admin/users/admin',
    method: 'get',
    params: query
  })
}

export function updateAdminUser(id, data) {
  return service({
    url: `/admin/users/update/${id}`,
    method: 'put',
    data
  })
}

// 权限 permission 管理
// 获取管理员列表
export function getUserMangerList(query) {
  return service({
    url: '/admin/permission/list',
    method: 'get',
    params: query
  })
}

// 获取验证码
export function getCaptchaCode(data) {
  return service({
    url: '/api/captchacode',
    method: 'post',
    data
  })
}
// 校验图片验证码
export function checkCaptchaCode(data) {
  return service({
    url: '/api/verifycode',
    method: 'post',
    data
  })
}

// 获取邮箱验证码
export function sendEmailCode(data) {
  return service({
    url: '/api/emailcode',
    method: 'post',
    data
  })
}
// 校验邮箱验证码
export function checkEmailCode(data) {
  return service({
    url: '/api/captchacode',
    method: 'post',
    data
  })
}

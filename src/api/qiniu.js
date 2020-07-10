import service from '@/utils/request'

export function getToken() {
  return service({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}

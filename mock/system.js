import Mock from 'mockjs'

const BasicList = Mock.mock({
  update_at: '@datetime',
  uid: '982cbc6fcd6d',
  cpu_count: 8,
  cpu_name: 'Intel(R) i7-8565U 1.80GHz',
  os_arch: 'x86_64 (64 Bit)',
  os_byte_order: 'Little Endian',
  os_system: 'Ubuntu 16.04.6 LTS',
  net_mac: '98:2c:bc:6f:cd:6d',
  disk_total: '249.72',
  mem_total: '15.42'
})
const SimpleList = Mock.mock({
  update_at: '@datetime',
  uid: '982cbc6fcd6d',
  net_remote_ip: '192.168.2.167',
  net_local_ip: '127.0.0.1',
  mem_used: '42.83%',
  mem_usage: '6.61',
  sys_uptime: '1 days 2 hour 25 min',
  disk_used: '14.89%',
  disk_usage: '37.18',
  net_byte_sent: 2046633100,
  net_byte_recv: 682468170,
  cpu_average: '["0.93", "1.08", "1.01"]',
  login_count: 1,
  login_user: '[{"login_name":"zhxx","tty":"tty7","detail":"local","login_addr":":0","login_time":"2019-11-12 14:11"}]'
})
export default [
  {
    url: '/sys/basic',
    type: 'get',
    response: _ => {
    //   const { name } = config.query
    //   const mockNameList = BasicList.filter(item => {
    //     const lowerCaseName = item.uid.toLowerCase()
    //     return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
    //   })
      return {
        code: 20000,
        data: { items: BasicList }
      }
    }
  },

  // transaction list
  {
    url: '/sys/simple',
    type: 'get',
    response: _ => {
    //   const { name } = config.query
    //   const mockNameList = SimpleList.filter(item => {
    //     const lowerCaseName = item.uid.toLowerCase()
    //     return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
    //   })
      return {
        code: 20000,
        data: { items: SimpleList }
      }
    }
  }
]

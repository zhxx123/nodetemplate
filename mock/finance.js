// import Mock from 'mockjs'

// const count = 20

// const List = []
// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     id: '@increment',
//     user_id: '@integer(1, 100)',
//     coin_type: '@integer(0,2)',
//     coin_addr: '@string',
//     coin_amount: '@integer(10, 100)'
//   }))
// }

// const ListDigital = []

// for (let i = 0; i < count; i++) {
//   ListDigital.push(Mock.mock({
//     id: '@increment',
//     user_id: '@integer(1, 100)',
//     tx_index: '@integer(1,20)',
//     txid: '@string',
//     pay_type: '@integer(1,2)',
//     to_address: '@string',
//     tx_type: '@string',
//     tx_amount: '@integer(10, 100)',
//     fee: '@integer(10, 100)',
//     recv_time: '@integer(10, 100)',
//     server_ip: '@integer',
//     added: '@integer(0,1)',
//     detail: '@string'
//   }))
// }

// const ListLegal = []

// for (let i = 0; i < count; i++) {
//   ListLegal.push(Mock.mock({
//     id: '@increment',
//     user_id: '@integer(1, 100)',
//     pay_channel: '@integer(1,2)',
//     pay_type: '@integer(0,0)',
//     ex_price: '@integer(100000, 3000000)',
//     trade_type: '@integer(0, 1)',
//     order_id: '@string',
//     trade_no: '@string',
//     out_trade_no: '@string',
//     total_amount: '@integer(10000,99999)',
//     remain_amount: '@integer(10000,99999)',
//     trade_status: '@integer(1000, 1003)',
//     recv_time: '@datetime',
//     order_detail: '@string'
//   }))
// }

// const ListVitualCharge = []
// for (let i = 0; i < count; i++) {
//   ListVitualCharge.push(Mock.mock({
//     id: '@increment',
//     user_id: '@integer(1, 100)',
//     coin_type: '@integer(0,2)',
//     coin_amount: '@integer(100000, 3000000)',
//     operator_id: '@integer(0, 6)',
//     recharge_amount: '@integer(10000,99999)',
//     description: '@string'
//   }))
// }

// const ListCoinPrice = []
// ListCoinPrice.push(Mock.mock({
//   id: '@increment',
//   name: 'ETH',
//   price: '@integer(1, 100)',
//   discount: '0.95',
//   auto_update: '@integer(0, 1)',
//   time: '@datetime'
// }))
// ListCoinPrice.push(Mock.mock({
//   id: '@increment',
//   name: 'MGD',
//   price: '@integer(1, 100)',
//   discount: '0.95',
//   auto_update: '@integer(0, 1)',
//   time: '@datetime'
// }))
// ListCoinPrice.push(Mock.mock({
//   id: '@increment',
//   name: 'USDT',
//   price: '@integer(1, 100)',
//   discount: '0.95',
//   auto_update: '@integer(0, 1)',
//   time: '@datetime'
// }))
// const ListCoinPriceSpider = []
// for (let i = 0; i < count; i++) {
//   ListCoinPriceSpider.push(Mock.mock({
//     id: '@increment',
//     'name|1': ['MGD', 'ETH', 'USDT'],
//     'url|1': ['www.coinmarket.com', 'aicoin.cn', 'admin'],
//     price: '@integer(1, 100)',
//     time: '@datetime'
//   }))
// }

// const ListWalletBasic = []
// for (let i = 0; i < 2; i++) {
//   ListWalletBasic.push(Mock.mock({
//     id: '@increment',
//     'update_at': '@datetime',
//     'name|1': ['MGD', 'MGD'],
//     'version|1': ['1.4.1.1', '2.0.1'],
//     'net_model|1': ['Main', 'Testnet']
//   }))
// }
// const ListWalletSimple = []
// for (let i = 0; i < count; i++) {
//   ListWalletSimple.push(Mock.mock({
//     id: '@increment',
//     'update_at': '@datetime',
//     'name': 'MGD',
//     'balance': '@integer(1, 100)',
//     'block_height': '@integer(1, 100)',
//     'difficulty': '@integer(1, 100)',
//     'network_hash': '@integer(1, 100)'
//   }))
// }

// export default [
//   {
//     url: '/finance/list',
//     type: 'get',
//     response: config => {
//       const { coin_addr, coin_type, page = 1, limit = 20, sort } = config.query
//       let mockList = List.filter(item => {
//         if (coin_type && item.coin_type !== +coin_type) return false
//         if (coin_addr && item.coin_addr.indexOf(coin_addr) < 0) return false
//         return true
//       })
//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   },
//   {
//     url: '/finance/digital',
//     type: 'get',
//     response: config => {
//       const { txid, pay_type, page = 1, limit = 20, sort } = config.query
//       let mockList = ListDigital.filter(item => {
//         if (pay_type && item.pay_type !== +pay_type) return false
//         if (txid && item.txid.indexOf(txid) < 0) return false
//         return true
//       })
//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   },
//   {
//     url: '/finance/updateDigital',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   },
//   // legal
//   {
//     url: '/finance/legal',
//     type: 'get',
//     response: config => {
//       const { trade_no, pay_type, page = 1, limit = 20, sort } = config.query
//       let mockList = ListLegal.filter(item => {
//         if (pay_type && item.pay_type !== +pay_type) return false
//         if (trade_no && item.trade_no.indexOf(trade_no) < 0) return false
//         return true
//       })
//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   },
//   {
//     url: '/finance/updateLegal',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   },

//   // 虚拟充值记录
//   {
//     url: '/finance/virtualCharge',
//     type: 'get',
//     response: config => {
//       const { user_id, coin_type, page = 1, limit = 20, sort } = config.query
//       let mockList = ListVitualCharge.filter(item => {
//         if (coin_type && item.coin_type !== +coin_type) return false
//         if (user_id && item.user_id.indexOf(user_id) < 0) return false
//         return true
//       })
//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   },
//   {
//     url: '/coin/price',
//     type: 'get',
//     response: config => {
//       return {
//         code: 20000,
//         data: {
//           total: ListCoinPrice.length,
//           items: ListCoinPrice
//         }
//       }
//     }
//   },
//   {
//     url: '/coin/list',
//     type: 'get',
//     response: config => {
//       return {
//         code: 20000,
//         data: {
//           total: ListCoinPriceSpider.length,
//           items: ListCoinPriceSpider
//         }
//       }
//     }
//   },
//   {
//     url: '/wallet/basic',
//     type: 'get',
//     response: config => {
//       const { name } = config.query

//       const mockList = ListWalletBasic.filter(item => {
//         if (name && item.name.indexOf(name) < 0) return false
//         return true
//       })
//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: mockList
//         }
//       }
//     }
//   },
//   {
//     url: '/wallet/simple',
//     type: 'get',
//     response: config => {
//       const { name, page = 1, limit = 20 } = config.query
//       const mockList = ListWalletSimple.filter(item => {
//         if (name && item.name.indexOf(name) < 0) return false
//         return true
//       })

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   }
// ]

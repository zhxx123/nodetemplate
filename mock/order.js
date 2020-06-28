import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    user_id: '@integer(1, 100)',
    pay_type: '@integer(0,2)',
    pay_amount: '@string',
    ex_price: '@integer(100000, 3000000)',
    trade_type: '@integer(0, 6)',
    order_id: '@id',
    trade_no: '@string',
    out_trade_no: '@string',
    total_amount: '@integer(10, 100)',
    total_time: '@integer(0,1000)',
    create_at: '@integer(1000000000,1600000000)',
    'order_subject|1': ['新购服务', '续费'],
    order_status: '@integer(1000, 1005)',
    order_detail: '@string'
  }))
}

export default [
  {
    url: '/order/list',
    type: 'get',
    response: config => {
      const { trade_no, pay_type, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (pay_type && item.pay_type !== +pay_type) return false
        if (trade_no && item.trade_no.indexOf(trade_no) < 0) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/order/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/order/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


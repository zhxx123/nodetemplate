import Mock from 'mockjs'

const count = 20
// user list
const List = []

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    user_id: '@integer(1, 100)',
    user_name: '@string',
    email: '@email',
    password: '@string',
    'phone|11': '1',
    role_id: '@integer(0, 5)',
    register_at: '@datetime',
    register_ip: '118.225.224.120',
    status: '@integer(1000000000, 1600000000)'
  }))
}

// user login reord list
const loginRecordList = []

for (let i = 0; i < count; i++) {
  loginRecordList.push(Mock.mock({
    id: '@increment',
    user_id: '@integer(1, 100)',
    user_name: '@string',
    token: '@string',
    secret: '@string',
    login_at: '@datetime',
    login_ip: '118.225.224.120',
    login_city: '@city',
    express_in: '@integer(1000000000, 1600000000)',
    revoked: '@integer(0, 1)'
  }))
}

// user message list
const messageList = []

for (let i = 0; i < count; i++) {
  messageList.push(Mock.mock({
    id: '@increment',
    article_id: '@integer(1, 1000)',
    title: '@string',
    author_id: '@integer(1,100)',
    user_id: '@integer(1, 100)',
    read_at: '@datetime',
    read: '@integer(0, 1)'
  }))
}

export default [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const { email, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (email && item.email.indexOf(email) < 0) return false
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
    url: '/user/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/user/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // loginRecord
  {
    url: '/user/loginRecord',
    type: 'get',
    response: config => {
      const { user_name, revoked, page = 1, limit = 20, sort } = config.query
      let mockList = loginRecordList.filter(item => {
        if (revoked && item.revoked !== +revoked) return false
        if (user_name && item.user_name.indexOf(user_name) < 0) return false
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
    url: '/user/loginRecord/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user message
  {
    url: '/user/message',
    type: 'get',
    response: config => {
      const { title, read, page = 1, limit = 20, sort } = config.query
      let mockList = messageList.filter(item => {
        if (read && item.read !== +read) return false
        if (title && item.title.indexOf(title) < 0) return false
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
    url: '/user/message/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 权限管理
  {
    url: '/permission/admin',
    type: 'get',
    response: config => {
      const { email, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (email && item.email.indexOf(email) < 0) return false
        if (item.role_id < 1) return false
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
    url: '/permission/admin/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


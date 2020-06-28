import Mock from 'mockjs'

const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

const NoticeList = []

for (let i = 0; i < count; i++) {
  NoticeList.push(Mock.mock({
    id: '@increment',
    article_id: '@integer(0, 50)',
    category: '@integer(0, 2)',
    author_id: '@integer(10, 100)',
    priority: '@integer(0,1)',
    status: '@integer(0,1)',
    read_count: '@integer(0,100)',
    language: '@integer(0,1)',
    title: '@string(5, 10)',
    summary: '@string(5, 10)',
    content: baseContent,
    announcer: 'MassGrid',
    published_at: '@datetime'
  }))
}

const HelpList = []

for (let i = 0; i < count; i++) {
  HelpList.push(Mock.mock({
    id: '@increment',
    article_id: '@integer(0, 50)',
    author_id: '@integer(10, 100)',
    status: '@integer(0,1)',
    read_count: '@integer(0,100)',
    language: '@integer(0,1)',
    title: '@string(5, 10)',
    summary: '@string(5, 10)',
    content: baseContent,
    announcer: 'MassGrid',
    published_at: '@datetime'
  }))
}

export default [
  {
    url: '/article/notice/list',
    type: 'get',
    response: config => {
      const { title, language, page = 1, limit = 20, sort } = config.query

      let mockList = NoticeList.filter(item => {
        if (language && item.language !== +language) return false
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
    url: '/article/help/list',
    type: 'get',
    response: config => {
      const { title, language, page = 1, limit = 20, sort } = config.query

      let mockList = HelpList.filter(item => {
        if (language && item.language !== +language) return false
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
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of NoticeList) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
      for (const article of HelpList) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },
  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


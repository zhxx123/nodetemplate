/*
 * @Author: zhxx
 * @Date: 2020-01-10 09:19:56
 * @LastEditors: zhxx
 * @LastEditTime: 2020-06-26 20:59:46
 */
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/notice/list',
  name: 'Article',
  meta: {
    title: '文章管理',
    icon: 'nested',
    roles: [2, 4, 5] // you can set roles in root nav
  },
  children: [
    {
      path: 'notice',
      component: () => import('@/views/article/index'), // Parent router-view
      name: 'Notice',
      meta: { title: '公告管理' },
      redirect: '/article/notice/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/article/notice/list'),
          name: 'NoticeList',
          meta: { title: '公告列表', icon: 'list' }
        },
        {
          path: 'create',
          component: () => import('@/views/article/notice/create'),
          name: 'CreateNotice',
          meta: { title: '新建公告', icon: 'edit' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/article/notice/edit'),
          name: 'EditNotice',
          meta: { title: '编辑公告', noCache: true, activeMenu: '/article/notice/list' },
          hidden: true
        }
      ]
    },
    {
      path: 'help',
      component: () => import('@/views/article/index'), // Parent router-view
      name: 'help',
      meta: { title: '帮助中心' },
      redirect: '/article/help/list',
      children: [
        {
          path: 'type',
          component: () => import('@/views/article/help/type'),
          name: 'helpTypeList',
          meta: { title: '文章类型', icon: 'list' }
        },
        {
          path: 'list',
          component: () => import('@/views/article/help/list'),
          name: 'helpList',
          meta: { title: '文章列表', icon: 'list' }
        },
        {
          path: 'create',
          component: () => import('@/views/article/help/create'),
          name: 'Createhelp',
          meta: { title: '新建文章', icon: 'edit' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/article/help/edit'),
          name: 'Edithelp',
          meta: { title: '编辑文章', noCache: true, activeMenu: '/article/help/list' },
          hidden: true
        }
      ]
    }
  ]
}

export default articleRouter

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import articleRouter from './modules/article'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/article/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Dashboard',
        meta: { title: '用户详情', icon: 'user', affix: true }
      }
    ]
  },
  /**
   * 获取用户个人信息
   */
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/machine',
    component: Layout,
    redirect: '/machine/list',
    name: 'Machines',
    meta: {
      title: '机器监控',
      icon: 'example',
      roles: [1, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/dashboard/index'),
        name: 'MachineList',
        meta: { title: '服务器监控', icon: 'edit' }
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/dashboard/admin/detail'),
        name: 'MachineDetail',
        meta: { title: '服务器详情', icon: 'edit' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'Users',
    meta: {
      title: '用户管理',
      icon: 'lock',
      roles: [4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'loginRecord',
        component: () => import('@/views/user/loginRecord'),
        name: 'LoginRecord',
        meta: {
          title: '登录记录'
        }
      },
      {
        path: 'message',
        component: () => import('@/views/user/message'),
        name: 'Message',
        meta: {
          title: '消息记录'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'analysis',
        component: () => import('@/views/user/analysis'),
        name: 'UserAnalysis',
        meta: {
          title: '用户分析'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  articleRouter,
  {
    path: '/wallet',
    component: Layout,
    redirect: '/wallet/walletMonitor',
    name: 'Wallet',
    meta: {
      title: '钱包管理',
      icon: 'example',
      roles: [1, 3, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'walletMonitor',
        component: () => import('@/views/wallet/wallet'),
        name: 'walletMonitor',
        meta: { title: '钱包监控', icon: 'edit' }
      },
      {
        path: 'priceMonitor',
        component: () => import('@/views/wallet/price'),
        name: 'priceMonitor',
        meta: { title: '价格监控', icon: 'edit' }
      },
      {
        path: 'addressRecord',
        component: () => import('@/views/wallet/address'),
        name: 'addressRecord',
        meta: { title: '地址分配', icon: 'list' }
      },
      {
        path: 'walletDetail/:id',
        component: () => import('@/views/wallet/walletDetail'),
        name: 'walletDetail',
        hidden: true,
        meta: { title: '钱包详情', icon: 'edit' }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/assetflow',
    name: 'Finance',
    meta: {
      title: '财务管理',
      icon: 'example',
      roles: [3, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'assetSummary',
        component: () => import('@/views/finance/summary'),
        name: 'AssetSummary',
        meta: { title: '资产总览', icon: 'list' }
      },
      {
        path: 'assetflow',
        component: () => import('@/views/finance/assetFlow'),
        name: 'AssetFlow',
        meta: { title: '资产流水', icon: 'list' }
      },
      {
        path: 'list',
        component: () => import('@/views/finance/userAssetList'),
        name: 'UserAssetList',
        meta: { title: '用户资产', icon: 'edit' }
      },
      {
        path: 'digital',
        component: () => import('@/views/finance/digital'),
        name: 'FinanceDigital',
        meta: { title: '数字货币', icon: 'edit' }
      },
      {
        path: 'ethDigital',
        component: () => import('@/views/finance/ethDigital'),
        name: 'FinanceDigital',
        meta: { title: '数字货币ETH', icon: 'edit' }
      },
      {
        path: 'digitalrecord',
        component: () => import('@/views/finance/digitalRecord'),
        name: 'FinanceDigitalRecord',
        meta: { title: '到账统计', icon: 'edit' }
      },
      {
        path: 'legal',
        component: () => import('@/views/finance/legal'),
        name: 'FinanceLegal',
        meta: { title: '法定货币', icon: 'edit' }
      },
      {
        path: 'virtualCharge',
        component: () => import('@/views/finance/virtual'),
        name: 'VirtualCharge',
        meta: { title: '虚拟充值', icon: 'edit' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Products',
    meta: {
      title: '商品管理',
      icon: 'example',
      roles: [2, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/list'),
        name: 'ProductList',
        meta: { title: '商品列表', icon: 'edit' }
      },
      {
        path: 'farm',
        component: () => import('@/views/product/farm'),
        name: 'FarmList',
        meta: { title: '矿场列表', icon: 'edit' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Orders',
    meta: {
      title: '订单管理',
      icon: 'example',
      roles: [3, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: 'OrderList',
        meta: { title: '订单列表', icon: 'list' }
      },
      {
        path: 'miner',
        component: () => import('@/views/order/miner'),
        name: 'MinerList',
        meta: { title: '矿场订单', icon: 'list' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/admin',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: [4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/permission/admin'),
        name: 'AdminList',
        meta: {
          title: '管理员',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '角色切换'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/safe',
    name: 'Setting',
    meta: {
      title: '系统设置',
      icon: 'example',
      roles: [1, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'safe',
        component: () => import('@/views/setting/safe'),
        name: 'Safe',
        meta: { title: '安全设置', icon: 'edit' }
      },
      {
        path: 'transaction',
        component: () => import('@/views/setting/transaction'),
        name: 'Transaction',
        meta: { title: '交易设置', icon: 'edit' }
      },
      {
        path: 'sets',
        component: () => import('@/views/setting/sets'),
        name: 'Sets',
        meta: { title: '其他设置', icon: 'edit' }
      },
      {
        path: 'gitlog',
        component: () => import('@/views/setting/gitlog'),
        name: 'GitLog',
        meta: { title: 'github日志', icon: 'list' }
      }
    ]
  },
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/analysis',
    name: 'Logs',
    meta: {
      title: '日志管理',
      icon: 'example',
      roles: [1, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/logs/analysis'),
        name: 'LogsAnalysis',
        meta: { title: '日志分析', icon: 'edit' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: '错误页面',
      icon: '404',
      roles: [2, 4, 5] // you can set roles in root nav
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

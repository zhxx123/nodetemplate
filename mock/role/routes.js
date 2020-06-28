// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/user',
    component: 'layout/Layout',
    redirect: '/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'Users',
    meta: {
      title: '用户管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: 'views/user/list',
        name: 'List',
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'loginRcord',
        component: 'views/user/loginRcord',
        name: 'LoginRcord',
        meta: {
          title: '登录记录'
        }
      },
      {
        path: 'message',
        component: 'views/user/message',
        name: 'Message',
        meta: {
          title: '用户消息'
        }
      },
      {
        path: 'analysis',
        component: 'views/user/analysis',
        name: 'Analysis',
        meta: {
          title: '用户分析'
        }
      }
    ]
  },
  {
    path: '/finance',
    component: 'layout/Layout',
    redirect: '/finance/list',
    alwaysShow: true, // will always show the root menu
    name: 'Finance',
    meta: {
      title: '数字货币',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: 'views/finance/list',
        name: 'OrderList',
        meta: {
          title: '用户资产'
        }
      },
      {
        path: 'digital',
        component: 'views/finance/digital',
        name: 'FinanceDigtial',
        meta: {
          title: '数字货币'
        }
      },
      {
        path: 'legal',
        component: 'views/finance/legal',
        name: 'FinanceLegal',
        meta: {
          title: '法定货币'
        }
      },
      {
        path: 'virtualCharge',
        component: 'views/finance/virtual',
        name: 'VirtualCharge',
        meta: {
          title: '虚拟充值'
        }
      }
    ]
  },
  {
    path: '/product',
    component: 'layout/Layout',
    redirect: '/product/list',
    alwaysShow: true, // will always show the root menu
    name: 'Products',
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: 'views/product/list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/order',
    component: 'layout/Layout',
    redirect: '/order/list',
    alwaysShow: true, // will always show the root menu
    name: 'Orders',
    meta: {
      title: '用户管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: 'views/order/list',
        name: 'OrderList',
        meta: {
          title: '用户列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/components',
    component: 'layout/Layout',
    redirect: 'noRedirect',
    name: 'ComponentDemo',
    meta: {
      title: 'Components',
      icon: 'component'
    },
    children: [
      {
        path: 'tinymce',
        component: 'views/components-demo/tinymce',
        name: 'TinymceDemo',
        meta: { title: 'Tinymce' }
      },
      {
        path: 'markdown',
        component: 'views/components-demo/markdown',
        name: 'MarkdownDemo',
        meta: { title: 'Markdown' }
      },
      {
        path: 'json-editor',
        component: 'views/components-demo/json-editor',
        name: 'JsonEditorDemo',
        meta: { title: 'Json Editor' }
      },
      {
        path: 'split-pane',
        component: 'views/components-demo/split-pane',
        name: 'SplitpaneDemo',
        meta: { title: 'SplitPane' }
      },
      {
        path: 'avatar-upload',
        component: 'views/components-demo/avatar-upload',
        name: 'AvatarUploadDemo',
        meta: { title: 'Avatar Upload' }
      },
      {
        path: 'dropzone',
        component: 'views/components-demo/dropzone',
        name: 'DropzoneDemo',
        meta: { title: 'Dropzone' }
      },
      {
        path: 'sticky',
        component: 'views/components-demo/sticky',
        name: 'StickyDemo',
        meta: { title: 'Sticky' }
      },
      {
        path: 'count-to',
        component: 'views/components-demo/count-to',
        name: 'CountToDemo',
        meta: { title: 'Count To' }
      },
      {
        path: 'mixin',
        component: 'views/components-demo/mixin',
        name: 'ComponentMixinDemo',
        meta: { title: 'componentMixin' }
      },
      {
        path: 'back-to-top',
        component: 'views/components-demo/back-to-top',
        name: 'BackToTopDemo',
        meta: { title: 'Back To Top' }
      },
      {
        path: 'drag-dialog',
        component: 'views/components-demo/drag-dialog',
        name: 'DragDialogDemo',
        meta: { title: 'Drag Dialog' }
      },
      {
        path: 'drag-select',
        component: 'views/components-demo/drag-select',
        name: 'DragSelectDemo',
        meta: { title: 'Drag Select' }
      },
      {
        path: 'dnd-list',
        component: 'views/components-demo/dnd-list',
        name: 'DndListDemo',
        meta: { title: 'Dnd List' }
      },
      {
        path: 'drag-kanban',
        component: 'views/components-demo/drag-kanban',
        name: 'DragKanbanDemo',
        meta: { title: 'Drag Kanban' }
      }
    ]
  },
  {
    path: '/article',
    component: 'layout/Layout',
    redirect: '/article/notice/list',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'notice',
        component: 'views/article/index',
        name: 'Notice',
        meta: { title: '公告管理' },
        redirect: '/article/notice/list',
        children: [
          {
            path: 'create',
            component: 'views/article/notice/create',
            name: 'CreateNotice',
            meta: { title: '新建公告', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: 'views/article/notice/edit',
            name: 'EditNotice',
            meta: { title: '编辑公告', noCache: true },
            hidden: true
          },
          {
            path: 'list',
            component: 'views/article/notice/list',
            name: 'NoticeList',
            meta: { title: '公告列表', icon: 'list' }
          }
        ]
      },
      {
        path: 'help',
        component: 'views/article/index', // Parent router-view
        name: 'help',
        meta: { title: '帮助中心' },
        redirect: '/article/help/list',
        children: [
          {
            path: 'create',
            component: 'views/article/help/create',
            name: 'Createhelp',
            meta: { title: '新建文章', icon: 'edit' }
          },
          {
            path: 'edit/:id(\\d+)',
            component: 'views/article/help/edit',
            name: 'Edithelp',
            meta: { title: '编辑文章', noCache: true },
            hidden: true
          },
          {
            path: 'list',
            component: 'views/article/help/list',
            name: 'helpList',
            meta: { title: '文章列表', icon: 'list' }
          }
        ]
      }
    ]
  },
  //   {
  //     path: '/tab',
  //     component: 'layout/Layout',
  //     children: [
  //       {
  //         path: 'index',
  //         component: 'views/tab/index',
  //         name: 'Tab',
  //         meta: { title: 'Tab', icon: 'tab' }
  //       }
  //     ]
  //   },
  {
    path: '/excel',
    component: 'layout/Layout',
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: 'views/excel/export-excel',
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: 'views/excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'Select Excel' }
      },
      {
        path: 'export-merge-header',
        component: 'views/excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: 'views/excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  {
    path: '/i18n',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: 'views/i18n-demo/index',
        name: 'I18n',
        meta: { title: 'I18n', icon: 'international' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

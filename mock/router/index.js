// import charts from './demo/charts'
// import components from './demo/components'
// import nested from './demo/nested'
// import table from './demo/table'

// const demo = [
//   {
//     path: 'demo',
//     name: '演示(动态菜单)',
//     title: '演示(动态菜单)',
//     icon: 'chart',
//     redirect: '/demo/guide',
//     children: [
//       {
//         path: 'guide',
//         routename: 'guide',
//         component: 'views/demo/guide/index',
//         name: '引导页',
//         title: '引导页',
//         icon: 'guide',
//         noCache: true
//       },
//       {
//         path: 'profile',
//         routename: 'profile',
//         component: 'views/demo/profile/index',
//         name: '个人中心',
//         title: '个人中心',
//         icon: 'user',
//         noCache: true
//       },
//       {
//         path: 'icon',
//         routename: 'icon_index',
//         component: 'views/demo/icons/index',
//         name: '图标',
//         title: '图标',
//         icon: 'icon',
//         noCache: true
//       },
//       {
//         path: 'tab',
//         routename: 'tab_index',
//         component: 'views/demo/tab/index',
//         name: '选项卡',
//         title: '选项卡',
//         icon: 'tab'
//       },

//       {
//         path: 'zip',
//         routename: 'zip_index',
//         component: 'views/demo/zip/index',
//         name: '导出Zip',
//         title: '导出Zip',
//         icon: 'zip'
//       },
//       {
//         path: 'pdf',
//         routename: 'pdf_index',
//         component: 'views/demo/pdf/index',
//         name: 'PDF',
//         title: '下载PDF',
//         icon: 'pdf'
//       },

//       {
//         path: 'pdf/download',
//         routename: 'pdf_download',
//         component: 'views/demo/pdf/download',
//         hidden: true
//       },
//       {
//         path: 'theme',
//         routename: 'theme_index',
//         component: 'views/demo/theme/index',
//         name: '主题',
//         title: '主题',
//         icon: 'theme'
//       },

//       {
//         path: 'clipboard',
//         routename: 'clipboard',
//         component: 'views/demo/clipboard/index',
//         name: '剪贴板',
//         title: '剪贴板',
//         icon: 'clipboard'
//       },

//       {
//         path: 'example',
//         name: '示例',
//         component: 'views/demo/example/index',
//         routename: 'example_index',
//         title: '示例',
//         icon: 'example',
//         children: [
//           {
//             path: 'list',
//             routename: 'example_list',
//             component: 'views/demo/example/list',
//             name: '文章列表',
//             title: '文章列表', icon: 'list'
//           },
//           {
//             path: 'create',
//             routename: 'example_create',
//             component: 'views/demo/example/create',
//             name: '创建文章',
//             title: '创建文章', icon: 'edit'
//           },
//           {
//             path: 'edit/:id(\\d+)',
//             routename: 'example_edit',
//             component: 'views/demo/example/edit',
//             name: '修改文章',
//             title: '修改文章', noCache: true,
//             activeMenu: 'example/list',
//             hidden: true
//           }
//         ]
//       },
//       {
//         path: 'error',
//         name: '错误页面',
//         component: 'views/error-page/index',
//         routename: 'error_page_index',
//         title: '错误页面',
//         icon: '404',
//         children: [
//           {
//             path: '401',
//             component: 'views/error-page/401',
//             routename: 'error_page_401',
//             name: 'Page401',
//             title: '401',
//             noCache: true
//           },
//           {
//             path: '404',
//             component: 'views/error-page/404',
//             routename: 'error_page_404',
//             name: 'Page404',
//             title: '404',
//             noCache: true
//           }
//         ]
//       },

//       {
//         path: 'excel',
//         component: 'views/demo/excel/index',
//         routename: 'excel_index',
//         name: 'Excel表格',
//         title: 'Excel表格',
//         icon: 'excel',
//         children: [
//           {
//             path: 'excel/export-excel',
//             component: 'views/demo/excel/export-excel',
//             routename: 'excel_export_excel',
//             name: '导出Excel',
//             title: '导出Excel'
//           },
//           {
//             path: 'excel/export-selected-excel',
//             component: 'views/demo/excel/select-excel',
//             routename: 'excel_select_excel',
//             name: '导出选中',
//             title: '导出选中'
//           },
//           {
//             path: 'excel/export-merge-header',
//             component: 'views/demo/excel/merge-header',
//             routename: 'excel_merge_header',
//             name: '合并表头',
//             title: '合并表头'
//           },
//           {
//             path: 'excel/upload-excel',
//             component: 'views/demo/excel/upload-excel',
//             routename: 'excel_upload_excel',
//             name: '上传表格',
//             title: '上传表格'
//           }
//         ]
//       },
//       ...charts,
//       ...components,
//       ...nested,
//       ...table
//     ]
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ]

const asyncRoutes = [
  {
    path: 'technicalplatform',
    redirect: '/technicalplatform/micrioservice',
    meta: { title: '技术中台', icon: 'dashboard', roles: ['admin'] },
    children: [
      {
        path: 'micrioservice',
        component: '/views/technicalplatform/MicrioService',
        routename: 'MicrioService',
        name: 'MicrioService',
        meta: { title: '平台架构', roles: ['admin'] }
      },
      {
        path: 'distributedfilesystem',
        component: '/views/technicalplatform/DistributedFileSystem',
        routename: 'DistributedFileSystem',
        name: 'DistributedFileSystem',
        meta: { title: '分布式文件系统', roles: ['admin'] }
      },
      {
        path: 'fulltextsearcmiddleware',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'FullTextSearcMiddleware',
        meta: { title: '全文检索中间件', iframeUrl: `http://23.36.250.116:8030/Page/Index.html?ApiAddress=23.36.250.116:8030&Server=平台业务聚合检索` }
      },
      {
        path: 'distributedGISsystem',
        component: '/views/technicalplatform/DistributedGISSystem',
        routename: 'DistributedGISSystem',
        name: 'DistributedGISSystem',
        meta: { title: '分布式GIS中间件', roles: ['admin'] }
      },
      {
        path: 'distributedcatche',
        component: '/views/technicalplatform/DistributedCatche',
        routename: 'DistributedCatche',
        name: 'DistributedCatche',
        meta: { title: '分布式缓存', roles: ['admin'] }
      },
      {
        path: 'distributeddatabase',
        component: '/views/technicalplatform/DistributedDatabase',
        routename: 'DistributedDatabase',
        name: 'DistributedDatabase',
        meta: { title: '分布式数据库', roles: ['admin'] }
      },
      {
        path: 'messagemiddleware',
        component: '/views/technicalplatform/MessageMiddleware',
        routename: 'MessageMiddleware',
        name: 'MessageMiddleware',
        meta: { title: '消息中间件', roles: ['admin'] }
      },
      {
        path: 'persistentmiddleware',
        component: '/views/technicalplatform/PersistentMiddleware',
        routename: 'PersistentMiddleware',
        name: 'PersistentMiddleware',
        meta: { title: '持久化中间件', roles: ['admin'] }
      },
      {
        path: 'distributedcomputingframework',
        component: '/views/technicalplatform/DistributedComputingFramework',
        routename: 'DistributedComputingFramework',
        name: 'DistributedComputingFramework',
        meta: { title: '分布式计算框架', roles: ['admin'] }
      },
      {
        path: 'blockchain',
        component: '/views/technicalplatform/BlockChain',
        routename: 'BlockChain',
        name: 'BlockChain',
        meta: { title: '区块链', roles: ['admin'] }
      },
      {
        path: 'artificialintelligence',
        component: '/views/technicalplatform/ArtificialIntelligence',
        routename: 'ArtificialIntelligence',
        name: 'ArtificialIntelligence',
        meta: { title: '人工智能', roles: ['admin'] }
      }
    ]
  },

  {
    path: 'sharingcenter',
    redirect: '/sharingcenter/ServiceSupermarket',
    meta: { title: '共享中心', icon: 'education', roles: ['admin'] },
    children: [
      {
        path: 'servicesupermarket',
        component: '/views/sharingcenter/ServiceSupermarket',
        routename: 'ServiceSupermarket',
        name: 'ServiceSupermarket',
        meta: { title: '服务超市', roles: ['admin'] }
      },
      {
        path: 'messagesupermarket',
        component: '/views/sharingcenter/MessageSupermarket',
        routename: 'MessageSupermarket',
        name: 'MessageSupermarket',
        meta: { title: '消息超市', roles: ['admin'] }
      },
      {
        path: 'mapsupermarket',
        component: '/views/sharingcenter/MapSupermarket',
        routename: 'MapSupermarket',
        name: 'MapSupermarket',
        meta: { title: '地图超市', roles: ['admin'] }
      }
    ]
  },

  {
    path: 'monitoringmaintenance',
    redirect: '/monitoringmaintenance/businessoperation',
    meta: { title: '监控运维', icon: 'eye-open', roles: ['admin'] },
    children: [
      {
        path: 'businessoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'BusinessOperation',
        meta: { title: '业务运行监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'serveroperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'ServerOperation',
        meta: { title: '服务监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'messageoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'MessageOperation',
        meta: { title: '消息监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'dataaccessoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'DataAccessOperation',
        meta: { title: '数据访问监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'baseoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'BaseOperation',
        meta: { title: '基础环境监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'safeoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'SafeOperation',
        meta: { title: '平台安全监控', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'logoperation',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'LogOperation',
        meta: { title: '日志查询', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'applicationonlineaudit',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'ApplicationOnlineAudit',
        meta: { title: '应用上线审核', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      },
      {
        path: 'datamodificationreview',
        component: '/components/Iframe/index',
        routename: 'iframe_index',
        name: 'DataModificationReview',
        meta: { title: '数据修改审核', iframeUrl: process.env.VUE_APP_MONITOR, roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export { asyncRoutes }

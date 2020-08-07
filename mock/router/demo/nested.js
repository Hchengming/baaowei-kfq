const nested = [
  {
    path: 'nested',
    name: '多级路由',
    title: '多级路由',
    icon: 'chart',
    routename: 'nested_index',
    component: 'views/demo/nested/index',
    children: [
      {
        path: 'menu1',
        name: '多级路由-一',
        title: '多级路由-一',
        icon: 'chart',
        routename: 'nested_menu1_index',
        component: 'views/demo/nested/menu1/index',
        children: [
          {
            path: 'menu1-1',
            name: '多级路由-一-一',
            title: '多级路由-一-一',
            icon: 'chart',
            routename: 'nested_menu1_menu1_1',
            component: 'views/demo/nested/menu1/menu1-1'
          },
          {
            path: 'menu1-2',
            name: '多级路由-一-二',
            title: '多级路由-一-二',
            icon: 'chart',
            routename: 'nested_menu1_menu1-2',
            component: 'views/demo/nested/menu1/menu1-2'
          },
          {
            path: 'menu1-3',
            name: '多级路由-一-三',
            title: '多级路由-一-三',
            icon: 'chart',
            routename: 'nested_menu1_menu1_3',
            component: 'views/demo/nested/menu1/menu1-3'
          }
        ]
      },
      {
        path: 'menu2',
        name: '多级路由-二',
        title: '多级路由-二',
        icon: 'chart',
        routename: 'nested_menu2',
        component: 'views/demo/nested/menu2'
      }
    ]
  }
]

export default nested

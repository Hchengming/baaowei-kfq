/** When your routing table is too long, you can split it into small modules**/
const chartsRouter = [
  {
    path: 'charts',
    name: 'Charts',
    title: '图表',
    icon: 'chart',
    routename: 'charts_index',
    component: 'views/demo/charts/index',
    children: [
      {
        path: 'keyboard',
        name: '键盘图表',
        routename: 'charts_keyboard',
        component: 'views/demo/charts/keyboard',
        title: '键盘图表',
        noCache: true
      },
      {
        path: 'line',
        name: '折线图',
        routename: 'charts_line',
        component: 'views/demo/charts/line',
        title: '折线图',
        noCache: true
      },
      {
        path: 'mix-chart',
        name: '混合图表',
        routename: 'charts_mix_chart',
        component: 'views/demo/charts/mix-chart',
        title: '混合图表',
        noCache: true
      }
    ]
  }
]

export default chartsRouter

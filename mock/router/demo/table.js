
const tableRouter = [{
  path: 'demo/table',
  name: '表格',
  title: '表格',
  icon: 'table',
  routename: 'table_index',
  children: [
    {
      path: 'dynamic-table',
      routename: 'table_dynamic_table',
      component: 'views/demo/table/dynamic-table',
      name: '动态表格',
      title: '动态表格'
    },
    {
      path: 'drag-table',
      routename: 'table_drag_table',
      component: 'views/demo/table/drag-table',
      name: '拖拽表格',
      title: '拖拽表格'
    },
    {
      path: 'inline-edit-table',
      routename: 'table_inline_edit_table',
      component: 'views/demo/table/inline-edit-table',
      name: '行编辑表格',
      title: '行编辑表格'
    },
    {
      path: 'complex-table',
      routename: 'table_complex_table',
      component: 'views/demo/table/complex-table',
      name: '综合表格',
      title: '综合表格'
    }
  ]
}
]
export default tableRouter

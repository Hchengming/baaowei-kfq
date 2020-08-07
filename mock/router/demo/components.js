/** When your routing table is too long, you can split it into small modules **/

const componentsRouter = [{
  path: 'demo/components',
  name: '组件',
  title: '组件',
  icon: 'component',
  routename: 'components_index',
  children: [
    {
      path: 'tinymce',
      routename: 'components_tinymce',
      component: 'views/demo/components-demo/tinymce',
      name: '富文本编辑器',
      title: '富文本编辑器'
    },
    {
      path: 'markdown',
      routename: 'components_markdown',
      component: 'views/demo/components-demo/markdown',
      name: 'MarkdownDemo',
      title: 'Markdown'
    },
    {
      path: 'json-editor',
      routename: 'components_json_editor',
      component: 'views/demo/components-demo/json-editor',
      name: 'JsonEditorDemo',
      title: 'JSON 编辑器'
    },
    {
      path: 'split-pane',
      routename: 'components_split_pane',
      component: 'views/demo/components-demo/split-pane',
      name: 'SplitpaneDemo',
      title: 'SplitPane'
    },
    {
      path: 'avatar-upload',
      routename: 'components_avatar_upload',
      component: 'views/demo/components-demo/avatar-upload',
      name: 'AvatarUploadDemo',
      title: '头像上传'
    },
    {
      path: 'dropzone',
      routename: 'components_dropzone',
      component: 'views/demo/components-demo/dropzone',
      name: 'DropzoneDemo',
      title: 'Dropzone'
    },
    {
      path: 'sticky',
      routename: 'components_sticky',
      component: 'views/demo/components-demo/sticky',
      name: 'StickyDemo',
      title: 'Sticky'
    },
    {
      path: 'count-to',
      routename: 'components_count_to',
      component: 'views/demo/components-demo/count-to',
      name: 'CountToDemo',
      title: 'Count To'
    },
    {
      path: 'mixin',
      routename: 'components_mixin',
      component: 'views/demo/components-demo/mixin',
      name: 'ComponentMixinDemo',
      title: '小组件'
    },
    {
      path: 'back-to-top',
      routename: 'components_back_to_top',
      component: 'views/demo/components-demo/back-to-top',
      name: 'BackToTopDemo',
      title: '返回顶部'
    },
    {
      path: 'drag-dialog',
      routename: 'components_drag_dialog',
      component: 'views/demo/components-demo/drag-dialog',
      name: 'DragDialogDemo',
      title: '拖拽 Dialog'
    },
    {
      path: 'drag-select',
      routename: 'components_drag_select',
      component: 'views/demo/components-demo/drag-select',
      name: 'DragSelectDemo',
      title: '拖拽 Select'
    },
    {
      path: 'dnd-list',
      routename: 'components_dnd_list',
      component: 'views/demo/components-demo/dnd-list',
      name: 'DndListDemo',
      title: '列表拖拽'
    },
    {
      path: 'drag-kanban',
      routename: 'components_drag_kanban',
      component: 'views/demo/components-demo/drag-kanban',
      name: 'DragKanbanDemo',
      title: '可拖拽看板'
    }
  ]
}
]

export default componentsRouter

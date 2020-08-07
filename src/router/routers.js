
// 动态加载路由
export const componentsMap = {
  error_page_index: () => import('@/views/error-page/index'),
  error_page_401: () => import('@/views/error-page/401'),
  error_page_404: () => import('@/views/error-page/404'),
  iframe_index: () => import('@/components/Iframe/index')
}

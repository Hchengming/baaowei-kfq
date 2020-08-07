const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  title: state => state.tagsView.title,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menu: state => state.user.menu,
  introduction: state => state.user.introduction,
  roles: state => state.permission.roles,
  routers: state => state.user.routers,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  message: state => state.subscription.message,
  iframes: state => state.Iframe.iframes
}
export default getters

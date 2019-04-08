const getters = {
  ajaxing: state => state.app.ajaxing,//全局ajax是否在请求中
  sidebar: state => state.app.sidebar,//侧边栏是否隐藏（目前没用到）
  visitedViews: state => state.app.visitedViews,//访问过的页面
  userInfo: state => state.user.userInfo,//登录用户信息
  userToken: state => state.user.userToken,//登录用户token
  addRouters: state => state.user.addRouters, //需权限路由集合
  userDict: state => state.user.userDict, //字典集合
  pageButtons: state => state.user.pageButtons, //页面按钮集合
}
export default getters

// import { loginPre, login } from 'api/user'
// import { errorRouter, addRoutes } from 'router'
// import md5 from 'utils/md5'
//
// // 页面刷新时，重新赋值
// const sessionStorageUserToken = sessionStorage.getItem('USERTOKEN')
// const sessionStorageUser = sessionStorage.getItem('USERINFO')
// const sessionStorageUserDict = sessionStorage.getItem('USERDICT')
//
// const user = {
//     state: {
//         userToken: sessionStorageUserToken ? sessionStorageUserToken : '',
//         userInfo: sessionStorageUser ? JSON.parse(sessionStorageUser) : null,
//         addRouters: [],
//         pageButtons: null,
//         userDict: sessionStorageUserDict ? JSON.parse(sessionStorageUserDict) : null,
//     },
//
//     mutations: {
//         SET_USERINFO: (state, userInfo) => {
//             state.userInfo = userInfo
//         },
//         SET_USERTOKEN: (state, userToken) => {
//             state.userToken = userToken
//         },
//         CLEAR_USERINFO: (state) => {
//             state.userInfo = null
//         },
//         CLEAR_USERTOKEN: (state) => {
//             state.userToken = ''
//         },
//         SET_USERDICT: (state, data) => {
//             state.userDict = data
//         },
//         SET_ROUTERS: (state, routers) => {
//             state.addRouters = routers.concat(errorRouter)
//         },
//         SET_PAGE_BUTTONS: (state, buttons) => {
//             state.pageButtons = buttons
//         }
//     },
//
//     actions: {
//         // 用户名登录
//         login({ commit }, userInfo, ) {
//             return new Promise((resolve, reject) => {
//                 loginPre(userInfo).then(res => {
//                     if (res.status == '1') {
//                         const { loginName, password, confirm } = userInfo
//                         const { rsa1, rsa2, rsa3, timestamp } = res.result
//                         const one = md5(password, rsa1)
//                         const two = rsa2.substr(-5)
//                         const three = rsa3.substr(0, 4)
//                         const passwordMD5 = md5(`${one}${rsa1}${timestamp}${two}${three}`)
//                         login({
//                             loginName,
//                             password: passwordMD5,
//                             confirm: confirm || false
//                         }).then(res => {
//                             if (res.status == '1') {
//                                 const result = res.result
//
//                                 const { accessToken } = result
//                                 sessionStorage.setItem('USERINFO', JSON.stringify(result));
//                                 sessionStorage.setItem('USERTOKEN', accessToken);
//                                 commit('SET_USERINFO', result);
//                                 commit('SET_USERTOKEN', accessToken);
//
//                                 resolve();
//                             }
//
//                             if (res.status == '2') {
//                                 resolve(res.result);
//                             }
//                         })
//                     }
//                 })
//             })
//         },
//
//         // 后端登出
//         LogOut({ commit, state }) {
//             return new Promise((resolve, reject) => {
//                 logout().then(() => {
//                     sessionStorage.removeItem('USERINFO')
//                     commit('CLEAR_USERINFO')
//                     resolve()
//                 })
//             })
//         },
//
//         // 前端 登出
//         FedLogOut({ commit }) {
//             return new Promise(resolve => {
//                 sessionStorage.removeItem('USERINFO')
//                 sessionStorage.removeItem('USERTOKEN')
//                 commit('CLEAR_USERINFO')
//                 commit('CLEAR_USERTOKEN')
//                 resolve()
//             })
//         },
//
//         //全局字典
//         getDict({ commit }) {
//             getDict().then(result => {
//                 sessionStorage.setItem('USERDICT', JSON.stringify(result));
//                 commit('SET_USERDICT', result)
//             })
//         },
//
//         // 权限路由
//         GenerateRoutes({ state, commit }, data) {
//             return new Promise(resolve => {
//                 const menus = state.userInfo.initNavButton;
//                 commit('SET_ROUTERS', addRoutes(menus))
//                 resolve()
//             })
//         },
//
//         // 单页权限按钮
//         pageButtons({ state, commit }, leftMenuId) {
//             return new Promise((resolve, reject) => {
//                 getPageButtons(state.userInfo.roleId, leftMenuId).then(response => {
//                     if (response !== false) {
//                         commit('SET_PAGE_BUTTONS', response);
//                         resolve();
//                     }
//                 })
//             })
//         },
//     }
// }
//
// export default user
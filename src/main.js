import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// import store from './store'
import availableRouter from './router'
import httpRequest from './utils/httpRequest'
import axios from 'axios';
import * as filters from './utils/filter' // 全局filter


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.httpRequest = httpRequest


//axios 全局配置
Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'www.xxx....'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('accessToken');


// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


availableRouter.beforeEach((to, from, next) => {
    var host_dev = '/';
    var host = host_dev;

    if (to.path == host + 'login' || to.path == host) {
        console.log('remove local user data...')
        sessionStorage.removeItem('accessToken');    // 移除用户数据，重新登录
        sessionStorage.removeItem('userInfo');
    }
    //刷新页面时判断用户数据是否还存在，存在则直接到内部；否则登录页面
    let user = sessionStorage.getItem('userInfo');
    if (!user && to.path != host + 'login') {
        next({path: '/login'});
    } else {
        next()
    }
});


new Vue({
    router:availableRouter,
    // store,
    render: h => h(App),
}).$mount('#app')

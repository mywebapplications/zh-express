import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'

import store from 'store'
import availableRouter from 'router'
// import constantRouter from 'router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI)
// Vue.use(VueRouter)

Vue.config.productionTip = false

// const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    // scrollBehavior: () => ({y: 0}),
    // routes: constantRouter
// });

new Vue({
    router:availableRouter,
    store,
    render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/index.vue'
// import Home from '../components/homepage/index.vue'

Vue.use(Router)


export const constantRouter = [
    {path: '/ZHExpressBk', component: import('../components/login/index.vue'), name: 'login'},

    {path: '/login', component: import('../components/login/index.vue'), name: 'login'},

    {path: '/home', component: import('../components/homepage/index.vue'), name: 'homePage'}
]


let availableRouter = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    // scrollBehavior: () => ({y: 0}),
    routes: constantRouter
})

export default availableRouter
// export  default  constantRouter


import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/index.vue'
import Home from '../components/homepage/index.vue'

Vue.use(Router)


export const constantRouter = [
    {path: '/ZHExpressBk', component: Login, name: 'login'},

    {path: '/login', component: Login, name: 'login'},

    {path: '/home', component: Home, name: 'homePage'}
]


let availableRouter = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // base: 'zhexpress',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouter
})

export default availableRouter


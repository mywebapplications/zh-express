/**
 * Created by Robin on 18/12/11
 * http配置
 */

import axios from 'axios'
import store from 'store'
import { Message } from 'element-ui'
// import router from './router'

const http = axios.create({
    baseURL: 'http://www.express.com/EXServer/',    //服务器地址
    // timeout:5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

http.interceptors.request.use(
    config => {
        config.headers.Authorization = store.getters.userToken
        store.commit('updateAjaxState', true) //全局ajax请求开启

        // //需要加密的字段进行加密
        // for(var i in config.data){
        //     if(encryptMapper.indexOf(i) !== -1 && config.data.hasOwnProperty(i)){
        //         config.data[i] = jsencrypt(config.data[i]).replace(/\s/g,'');
        //     }
        // }

        return config;
    }
);

http.interceptors.response.use(
    res => {
        store.commit('updateAjaxState', false) //全局ajax请求关闭


        //需要登录
        if (res.data.status == '3') {
            Message({
                message: res.data.result,
                type: 'error',
                duration: 3000,
                onClose: () => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    })
                }
            })
        }

        //请求返回出错的弹提示
        if (res.data.status == '0') {
            Message({
                message: res.data.result,
                type: 'error',
                duration: 3000
            })
        }

        return res;
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.get(url, {
                params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装其他类型的请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, method, data = {}) {
    return new Promise((resolve, reject) => {
        http({
            method,
            url,
            data
        }).then(res => {
            resolve(res.data);
        }, err => {
            reject(err)
        })
    })
}

//api 接口配置
//域名配置
let host_dev = 'http://120.26.48.110/ZHExpressServer';
let host_dev_localhost = 'http://127.0.0.1:8443/ZHExpressServer';
let host_live = 'http://115.159.77.50/ZHExpressServer';

//当前使用域名
var host = host_dev_localhost;

//----------接口-------------//
//登录
export const url_login = host + '/user/login';
//登出
export const url_logout = host + '/user/logout';

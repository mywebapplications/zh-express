
//api 接口配置
//域名配置
let host_dev = 'http://120.26.48.110/ZHExpressServer';
let host_dev_localhost = 'http://127.0.0.1:8443/ZHExpressServer';
let host_live = 'http://115.159.77.50/ZHExpressServer';

//当前使用域名
var host = host_dev;

//----------接口-------------//
//登录
export const url_login = host + '/user/login';
//登出
export const url_logout = host + '/user/logout';


//查询订单列表
export const url_order_list = host + '/order/list';
//获取条码分类类别
export const url_stypes = host + '/order/scanTypes';
//导出订单列表excel
export const url_order_export = host + '/order/exportOrders';

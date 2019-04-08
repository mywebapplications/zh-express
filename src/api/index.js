/** 
 * 用户相关API
 */
import { get, fetch } from 'utils/http'

export const loginPre= data => fetch('DoulongwanServer/user/loginPre','post',data)

export const login= data => fetch('xxx/user/login','post',data)

export const loginOut= data => fetch('DoulongwanServer/user/logout','post',data);

export const getUserList= data => get('DoulongwanServer/user/list',data);

import axios from 'axios';


// axios.defaults.baseURL = 'www.xxx....'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('AccessToken');

export default {
  /**
   * params:
   * {
    firstName:'Fred',
    lastName:'Flintstone'
   * }
   *
   * @param
   * @param url
   * @param params
   * @param onSuccess
   * @param onError
   * @param onLogout 用户登录状态失效
   */
  httpPost: function (url, params, onSuccess, onError, onLogout) {
    console.log('params:');
    console.dir(params);
    console.dir('http post >> url=' + url + " p=" + params);
    //axios config
    var accessToken = sessionStorage.getItem('accessToken');
    console.log('token: ' + accessToken);
    axios.defaults.headers.post['Content-Type'] = ' application/json';
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios.post(url, params)
      .then(function (res) {
        console.log('success res: ');
        console.dir(res.data);
        var status = res.data.status;
        console.log(status)
        if (status == 1 || status == "1") {
          onSuccess(res.data)
        } else if (status == 3 || status == "3") {
          onLogout(res.data);
        } else {
          onError(res.data)
        }
      })
      .catch(function (err) {
        console.log('catch error: ')
        console.dir(err);
        onError(err)
      });
  },

  /**
   * params:
   * {
    firstName:'Fred',
    lastName:'Flintstone'
   *}
   * @param url
   * @param params
   * @param onSuccess
   * @param onError
   * @param onLogout 用户登录状态失效
   */
  httpGet(url, params, onSuccess, onError, onLogout) {
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.post['Content-Type'] = ' application/json';
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('accessToken');
    console.dir('http post >> url=' + url + " p=" + params);
    axios.get(url, {params: params})
      .then(function (res) {
        var status = res.data.status;
        console.log("status: " + status)
        if (status == 1 || status == "1") {
          console.log('callback success')
          onSuccess(res.data)
        } else if (status == 3 || status == "3") {
          console.log('callback logout')
          onLogout(res.data);
        } else {
          console.log('callback error')
          onError(res.data)
        }
      })
      .catch(function (err) {
        console.log('callback exception'+err)
        // onError(err)
      });
  }


}

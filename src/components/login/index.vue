<template>
    <div class="parent_login">
        <el-form :model="loginForm" :rules="login_rules" ref="loginForm" label-position="left" label-width="0px"
                 class="login_form">
            <h3 class="title tit">智慧物流系统</h3>

            <el-form-item prop="account">
                <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item prop="checkPass">
                <el-input type="password" v-model="loginForm.checkPass" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>

            <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->

            <el-form-item style="width:100%; margin-top: 60px">
                <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="isLogin">登录
                </el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>

    import {url_login} from '../../api/api';

    export default {
        name: "Login",

        data() {
            return {
                isLogin: false,
                loginForm: {
                    account: '',
                    checkPass: '',
                    // note: 'background-image:url(' + require("../assets/image/img_login_bg.jpg") + ')',
                },

                //表单校验规则
                login_rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },

        methods: {
            login() {
                this.isLogin = true
                var _this = this

                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.isLogin = true
                        var loginParams = {'name': this.loginForm.account, 'password': this.loginForm.checkPass};

                        this.httpRequest.httpPost(url_login, loginParams,
                            function onSuccess(r) {
                                _this.loginSuccess(r);
                            },
                            function onFail(f) {

                                // if (_this.loginForm.account === 'admin' && _this.loginForm.checkPass === '123456') {
                                //     //本地测试用
                                //     var r = {
                                //         'status' : 1,
                                //         'result': {
                                //             'result':'本地测试登录成功！',
                                //             'AccessToken':'xxihrYisrUddsnvwpnv245dkncYngpnsd',
                                //             'userInfo':{
                                //                 'name':'admin',
                                //                 'pwd':'123456'
                                //             }
                                //         }
                                //     }
                                //     _this.loginSuccess(r);
                                // } else {
                                    //正常情况应该是报错
                                    _this.isLogin = false;
                                    _this.$message({
                                        message: f.result,
                                        type: 'error'
                                    })
                                // }
                            }, null)
                    }
                })
            },

            //登录成功
            loginSuccess(res) {
                console.log("login success res =: ")
                console.dir(res)
                this.isLogin = false;
                this.$message({
                    message: res.result.result,
                    type: 'success'
                })
                this.saveUserInfo(res.result)
                this.$router.push({path: '/home'})
            },

            //保存用户数据
            saveUserInfo(d) {
                sessionStorage.setItem("accessToken", d.accessToken)
                sessionStorage.setItem("userInfo", JSON.stringify(d))
            },
        },

    }
</script>


<style scoped>

    .parent_login {
        width: 100%;
        height: 100%;
        background-color: rgba(64, 128, 191, 0.97);
        /*background-color: #55abff;*/
        padding-top: 10%;
    }

    .login_form {
        width: 300px;
        height: 40%;
        margin: 0 auto;
        /*margin-top: 20%;*/
        padding-right: 5%;
        padding-left: 5%;

        background-color: white;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

        /*text-align: center;*/

        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;

        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 20px auto 40px auto;
        text-align: center;
        color: #505458;
        font-size: 30px;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }


</style>
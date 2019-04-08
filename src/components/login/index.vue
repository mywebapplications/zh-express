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
                console.dir(this)
                this.isLogin=true
                this.$refs.loginForm.validate(valid => {
                    if (valid) {

                        this.isLogin = true



                        // this.$store.dispatch('login', this.loginForm).then((result) => {
                        //     if (result) {
                        //         this.$confirm(result, '提示', {
                        //             confirmButtonText: '确定',
                        //             cancelButtonText: '取消',
                        //             type: 'warning'
                        //         }).then(() => {
                        //             this.loginForm.confirm=true
                        //             this.handleLogin()
                        //         }).catch(() => {
                        //
                        //         })
                        //     }else{
                        //         this.$router.push({name:'home'})
                        //     }
                        // })

                        // console.dir(Router1)
                        // console.dir(_this.$router)
                        // console.dir(this.$router)
                        console.dir(this)
                        this.$router.push({path:'/home'})
                        this.isLogin=false
                    }
                })
            }

        },

    }
</script>


<style scoped>

    .parent_login {
        width: 100%;
        height: 100%;
    }

    .login_form {
        width: 300px;
        height: 40%;
        margin: 0 auto;
        margin-top: 10%;
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
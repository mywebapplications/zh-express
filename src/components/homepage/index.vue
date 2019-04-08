<template>
    <!--<div id="app_home">-->

    <el-row class="container">

        <!--标题栏-->
        <el-col :span="24" class="topbar">
            <el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'"
                    style="text-align: center; width: 60px;">
                <!--<img src="../assets/image/img_logo.png" style="width: 45px; height: 45px; vertical-align: middle; background: rgba(255,255,255,0.55); border-radius: 10px;">-->

                <div class="sys_title">智慧物流系统</div>
            </el-col>

            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>

            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img
                  src="../../assets/image/img_user_icon.png"/> 账号：{{userName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

        </el-col>


        <div class="search_bar">

            <el-input
                    class="search_item"
                    placeholder="条码/图片编号"
                    prefix-icon="el-icon-picture"
                    v-model="code_bar">
            </el-input>
            <el-input
                    class="search_item"
                    placeholder="扫描人编号"
                    prefix-icon="el-icon-info"
                    v-model="code_user">
            </el-input>
            <el-input
                    class="search_item"
                    placeholder="仓库编号"
                    prefix-icon="el-icon-sort-up"
                    v-model="code_rep">
            </el-input>

            <el-select v-model="search_type" placeholder="请选择方式" class="search_item">
                <el-option
                        v-for="t in types"
                        :key="t"
                        :label="t"
                        :value="t">
                </el-option>
            </el-select>

            <el-date-picker style="margin-left: 20px"
                            v-model="search_time"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>


            <el-button type="primary" @click="handleSearch" icon="el-icon-search" style="margin-left: 20px">查询</el-button>

            <el-button type="primary" @click="handleExport" icon="el-icon-download" style="margin-left: 20px">导出</el-button>
        </div>

        <!--table-->
        <div class="table_box">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin: 20px 0 0 20px; font-weight: 800">总计：条码数 {{sum_number}}</div>

        <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">

        </el-pagination>
    </el-row>

    <!--</div>-->
</template>

<script>
    export default {
        name: "homePage",
        data() {
            return {
                sysName: '智慧物流系统',
                userName: 'admin',
                isCollapse: false,

                code_bar:'',
                code_user:'',
                code_rep:'',
                types: ['卸货','上货'],
                search_type :'',
                search_time:'',

                multipleSelection: [],
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],

                sum_number:100,

            };
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            onMenuCollapse() {
                console.log('menu collapse..')
                this.isCollapse = !this.isCollapse
            },

            goPushRouter(r) {
                console.log(r)
                this.$router.push(r)
            },

            //表格选择操作
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            handleSearch(){

            },

            handleExport(){

            }
        },


        // created() {
        //   console.log("Home. created() run")
        //   var hasMenu = sessionStorage.getItem('hasMenu');
        //   console.log("hasMenu? " + hasMenu);
        //   // if (hasMenu){
        //   //   this.generateMenu();
        //   // }
        // },
        //
        mounted() {
            // console.log("Home. mounted() run")
            // //加载用户信息
            // console.dir(sessionStorage)
            // var user = JSON.parse(sessionStorage.getItem('userInfo'));
            // if (user) {
            //   this.sysUserName = user.name || '';
            //   this.sysUserAvatar = user.iconurl || '';
            // }
        }
    }


</script>

<style scoped>
    /*@import '~scss_vars';*/
    .app_home {
        width: 100%;
        height: 100%;
        background: white;
    }

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        height: 100% !important;
        /*background: #dfffff;*/
    }

    .topbar {
        height: 60px;
        line-height: 60px;
        /*background: $color-primary;*/
        background-color: rgba(64, 128, 191, 0.97);
        color: #fff;
    }

    .sys_title {
        height: 45px;
        width: 200px;
        vertical-align: middle;
        margin-left: 10px;
        font-size: 25px
    }

    /*标题栏*/
    .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        vertical-align: middle;
    }

    .userinfo-inner {
        cursor: pointer;
        color: #fff;
        vertical-align: middle;

    }

    .userinfo-inner img {
        width: 45px;
        height: 45px;
        border-radius: 20px;
        margin: 5px 5px 10px 10px;
        float: right;
        vertical-align: middle;

    }

    .table_box {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .search_bar {
        padding: 80px 0 20px 0;
        background-color: rgba(209, 222, 219, 0.38);
        /*display: inline-block;*/
    }

    .search_item {
        width: 150px;
        margin: 10px 0 10px 10px;
    }

    .el-select .el-input {
        width: 130px;
    }

    .el-pagination{
        text-align: right;
    }
</style>

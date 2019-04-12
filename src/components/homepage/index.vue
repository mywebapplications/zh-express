<template>
    <div id="app_home">

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
                            <el-dropdown-item divided @click.native="dialogVisible = true">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>

            </el-col>


            <div class="search_bar">

                <el-input
                        class="search_item"
                        placeholder="条码编号"
                        prefix-icon="el-icon-picture"
                        v-model="se_num">
                </el-input>
                <el-input
                        class="search_item"
                        placeholder="图片编号"
                        prefix-icon="el-icon-picture"
                        v-model="se_num_pic">
                </el-input>
                <el-input
                        class="search_item"
                        placeholder="扫描人编号"
                        prefix-icon="el-icon-info"
                        v-model="se_num_user">
                </el-input>
                <el-input
                        class="search_item"
                        placeholder="仓库编号"
                        prefix-icon="el-icon-sort-up"
                        v-model="se_num_repo">
                </el-input>

                <el-select v-model="se_stype" placeholder="请选择方式" class="search_item">
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


                <el-button type="primary" @click="queryDataList(pageSize, pageNum)" icon="el-icon-search"
                           style="margin-left: 20px">查询
                </el-button>

                <el-button type="primary" @click="handleExport" icon="el-icon-download" style="margin-left: 20px">导出
                </el-button>

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
                            prop="repo_num"
                            label="仓库编号"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="user_num"
                            label="扫描人编号"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="stype"
                            label="扫描类型"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="条码编号"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="pic_num"
                            label="图片编号"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="createtime"
                            label="录入时间"
                            width="150">
                        <template scope="scope">
                            {{scope.row.createtime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updatetime"
                            label="更新时间"
                            width="150">
                        <template scope="scope">
                            {{scope.row.updatetime | parseTime}}
                        </template>
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

            <p style="margin: 20px 0 0 20px; font-weight: 800">总计：条码数 {{sum_number}}</p>

            <!--分页标签-->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="sum_number"
                    :page-size="pageSize"
                    @current-change="handlePageChange">
            </el-pagination>
        </el-row>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span>确定清除用户数据并退出登录？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="logout">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>

    import {url_order_list} from '../../api/api';
    import {url_stypes} from '../../api/api';

    export default {
        name: "homePage",
        data() {
            return {
                sysName: '智慧物流系统',
                userName: 'admin',
                isCollapse: false,

                pageSize: 15,
                pageNum: 1,
                ordeyBy: null,
                status: null,
                se_num: null,
                se_num_user: null,
                se_num_repo: null,
                se_num_pic: null,
                types: ['所有', '卸货', '上货'],
                se_stype: null,
                search_time: null,


                multipleSelection: [],
                tableData: [
                    // {
                    //     createtime: 1555087526000
                    //     id: 45
                    //     num: "58315990"
                    //     pic_addr: "66fe5320a3dd49c7a5df7dce1f1e8857"
                    //     pic_num: "ae40ey"
                    //     remarks: null
                    //     repo_num: "123456"
                    //     status: 1
                    //     stype: "卸货"
                    //     updatetime: 1555087526000
                    //     user_num: "20190409"
                    //     xlist: "3945|4084|4080|3941|"
                    //     ylist: "1952|1956|2120|2116|"
                    // }
                ],

                sum_number: 0,

                dialogVisible: false,

            };
        },

        mounted() {
            //加载用户信息
            var user = JSON.parse(sessionStorage.getItem('userInfo'));
            if (user) {
                this.userName = user.name || '';
                // this.sysUserAvatar = user.iconurl || '';
            }

            //请求扫描类型
            this.getStypes()

            //请求列表
            this.queryDataList(this.pageSize, this.pageNum)
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
            handleExport() {

            },

            //分页选择页面
            handlePageChange(i) {
                console.log("change page")
                this.pageNum = i
                this.queryDataList(this.pageSize, i)
            },

            //查询数据列表
            queryDataList(pageSize, pageNum) {
                var _this = this
                var params = {
                    'pageSize': pageSize,
                    'pageNum': pageNum,
                    'orderBy': this.orderBy ? this.orderBy : null,
                    'status': this.status ? this.status : null,
                    'startTime': this.search_time ? this.search_time[0] : null,
                    'endTime': this.search_time ? this.search_time[1] : null,
                    'stype': this.se_stype && this.se_stype !== '所有' ? this.se_stype : null,
                    'num': this.se_num ? this.se_num : null,
                    'repoNum': this.se_num_repo ? this.se_num_repo : null,
                    'picNum': this.se_num_pic ? this.se_num_pic : null,
                    'userNum': this.se_num_user ? this.se_num_user : null
                };
                this.httpRequest.httpGet(url_order_list, params,
                    function onSuccess(r) {
                        _this.praseList(r.result);
                    },
                    function onFail(f) {
                        //正常情况应该是报错
                        _this.$message({
                            message: f.result,
                            type: 'error'
                        })
                    }, null)
            },

            //解析列表数据
            praseList(data) {
                console.dir(data)
                // this.tableData=[]
                this.tableData = data.list
                this.sum_number = data.total

            },

            getStypes(){
                var _this = this
                this.httpRequest.httpGet(url_stypes, null,
                    function onSuccess(r) {
                        _this.types = []
                        _this.types.push('所有')
                        for (let v of r.result) {
                            _this.types.push(v.svalue)
                        }
                    },
                    null, null)
            },

            //退出登录
            logout() {
                this.dialogVisible = false
                sessionStorage.removeItem('accessToken');    // 移除用户数据，重新登录
                sessionStorage.removeItem('userInfo');
                this.$router.push({path: '/login'})
            },
        },
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

    .el-pagination {
        text-align: right;
    }

    el-dialog__body {
        text-align: center;
    }
</style>

<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>分页表格2</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form v-bind:inline="true" v-bind:model="postData">
            <el-form-item>
                <el-input size="medium" v-model="postData.irOrderNoLike" placeholder="irOrderNoLike"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input size="medium" v-model="postData.irWeiXinNickNameLike" placeholder="irWeiXinNickNameLike"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" v-on:click="$refs.table.search()" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" v-on:click="$refs.table.refresh()" icon="el-icon-refresh">刷新</el-button>
            </el-form-item>
            <el-form-item>
                <el-dropdown>
                    <el-button size="medium" type="success" icon="el-icon-download">导出excel</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-on:click="$refs.table.export('xlsx')">xlsx格式</el-dropdown-item>
                        <el-dropdown-item v-on:click="$refs.table.export('xls')">xls格式</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" type="primary" v-on:click="enable" icon="el-icon-check">启用</el-button>
                </el-form-item>
            </transition>
            <transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" v-on:click="disable" icon="el-icon-close">禁用</el-button>
                </el-form-item>
            </transition>
            <transition name="fade">
                <el-form-item v-show="checkedDatas.length>0">
                    <el-button size="medium" type="danger" v-on:click="delBatch" icon="el-icon-delete">删除</el-button>
                </el-form-item>
            </transition>
        </el-form>
        <!--
            对原有的page和table组件进行封装得到的翻页组件
            url 分页请求的url
            post-data   请求参数
            ret-data    分页请求返回的数据
            reduce-height   整个分页组件默认铺满整个页面，设置该属性减去的高度，以实现动态高度。
            checked-datas   获取选中的数据
            show-checked    是否显示复选框列
            excel-title     导出的excel表显示的名称
            export-url      导出操作的url
        -->
        <default-page ref="table" url="/api/IRobotQrCodePayTask/page" v-bind:post-data="postData" v-bind:ret-data.sync="retData" v-bind:reduce-height="120" v-bind:checked-datas.sync="checkedDatas"
            v-bind:show-checked="true" excel-title="测试数据.xlsx" export-url="/api/IRobotQrCodePayTask/export">
            <!--
                这里用的仍然是el-table组件的列。
            -->
            <el-table-column prop="irOrderNo" label="irOrderNo" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irWeiXinNickName" label="irWeiXinNickName" sortable="custom" v-bind:show-overflow-tooltip="true" width="160px"></el-table-column>
            <el-table-column prop="irWeiXinHeaderImage" label="irWeiXinHeaderImage" sortable="custom" v-bind:show-overflow-tooltip="true" width="180px"></el-table-column>
            <el-table-column prop="irQrCodeImagePath" label="irQrCodeImagePath" sortable="custom" v-bind:show-overflow-tooltip="true" width="180px"></el-table-column>
            <el-table-column prop="irHandleState" label="irHandleState" sortable="custom" v-bind:show-overflow-tooltip="true" width="160px"></el-table-column>
            <el-table-column prop="irHandleMessage" label="irHandleMessage" sortable="custom" v-bind:show-overflow-tooltip="true" width="160px"></el-table-column>
            <el-table-column prop="irHandleTime" label="irHandleTime" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irCreateTime" label="irCreateTime" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irReportPicPathJson" label="irReportPicPathJson" sortable="custom" v-bind:show-overflow-tooltip="true" width="180px"></el-table-column>
            <el-table-column prop="irTakeMoney" label="irTakeMoney" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irRobotId" label="irRobotId" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irRemark" label="irRemark" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irPushState" label="irPushState" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irPushTime" label="irPushTime" sortable="custom" v-bind:show-overflow-tooltip="true" width="150px"></el-table-column>
            <el-table-column prop="irScanPayNotifyRet" label="irScanPayNotifyRet" sortable="custom" v-bind:show-overflow-tooltip="true" width="180px"></el-table-column>
        </default-page>
    </div>
</template>
<script>
export default {
    name:'m17',
    data(){
        return {
            postData:{},
            retData:{},
            checkedDatas:[],
        };
    },
    methods:{
        test(){
            this.$refs.table.export('xlsx');
        },
        /**
         * 点击启用触发
         */
        enable(){
            
        },
        /**
         * 点击禁用触发
         */
        disable(){

        },
        /**
         * 点击删除用触发
         */
        delBatch(){

        }
    }
}
</script>

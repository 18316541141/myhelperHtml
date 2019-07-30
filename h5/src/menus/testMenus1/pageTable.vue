<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>分页表格2</el-breadcrumb-item>
        </el-breadcrumb>
        <!--
            对原有的page和table组件进行封装得到的翻页组件
            url 分页请求的url
            post-data   请求参数
            ret-data    分页请求返回的数据
            reduce-height   整个分页组件默认铺满整个页面，设置该属性减去的高度，以实现动态高度。
            checked-datas   获取选中的数据
            show-checked    是否显示复选框列
        -->
        <default-page url="/api/IRobotQrCodePayTask/page" v-bind:post-data="postData" v-bind:ret-data.sync="retData" v-bind:reduce-height="14" v-bind:checked-datas.sync="checkedDatas"
            v-bind:show-checked="true">
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
        
    }
}
</script>

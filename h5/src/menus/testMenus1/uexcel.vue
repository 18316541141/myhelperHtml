<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>上传单个excel</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-bind:model="myPostData">
            <upload-excel :url="$store.state.PROXY+'/IRobotQrCodePayTask/import'" type="form" v-bind:post-data="myPostData" ref="asdasdasd"></upload-excel>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'m18',
    data(){
        return {
            myPostData:{}
        };
    }
}
</script>

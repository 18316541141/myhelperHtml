<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>上传单个excel</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-bind:model="myPostData">
            <upload-excel url="/api/IRobotQrCodePayTask/import" type="form" v-bind:post-data="myPostData" ref="asdasdasd"></upload-excel>
        </el-form>
    </div>
</template>
<script>
import uploadExcel from '../../components/uploadExcel.vue'
export default {
    name:'m18',
    components:{uploadExcel},
    data(){
        return {
            myPostData:{}
        };
    }
}
</script>

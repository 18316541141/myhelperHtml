<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>上传多个文件</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-bind:model="form">
            <!--
                这是一个批量上传文件的组件
                file-desc-width：文件描述占据列宽
                path：文件上传的路径，用于区分模块
                files：绑定文件列表，用于记录保存数据库的文件名称
            -->
            <upload-files file-desc-width="200px" path="test" v-bind:files.sync="form.myFiles"></upload-files>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'m14',
    data(){
        return { form: { myFiles: [] } };
    }
}
</script>

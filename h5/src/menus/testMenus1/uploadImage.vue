<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>上传图片</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-bind:model="form">
            <!--
                这是一个上传图片插件
                cut：是否启用切割功能
                width-over-height：切割时的宽高比
                min-width：切割范围最小宽度
                max-width：切割范围最大宽度
                img-name：要保存到数据库的图片名称
                thumbnail-name：要保存到数据库的缩略图名称
            -->
            <upload-image v-bind:cut="true" v-bind:show-img-max-width="500" v-bind:width-over-height="[2,1]" v-bind:img-name.sync="form.myImgName" v-bind:thumbnail-name.sync="form.myThumbnailName"></upload-image>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'m12',
    data(){
        return {form:{myImgName: '', myThumbnailName:''}};
    }
}
</script>

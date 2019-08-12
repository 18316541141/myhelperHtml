<template>
    <div>
        <!--  
            含有返回、搜索按钮，底部选项卡的通用外框，参数如下
            @title  大标题
            @show-back  是否显示后退按钮
            @rightCallback  右边点击事件
            @right-icon-name    右边字体图标
            @tabs   下标签列表，name（标签调用的组件名称）,icon（标签图标）,info（标题数字提示）,title（标签描述）
            @select-tab 选中标签，通过添加.sync后缀以实现双向绑定
        <common-out-frame title="测试标题" v-bind:show-back="true" v-on:rightCallback="rightCallback" right-icon-name="search" 
        v-bind:tabs="[
            {name:'home',icon:'home-o',info:'5',title:'回家'},
            {name:'search',icon:'search',info:'10',title:'搜索'},
            {name:'friends',icon:'friends-o',info:'20',title:'群架'},
            {name:'setting',icon:'setting-o',info:'40',title:'设置'}
        ]" select-tab="home"></common-out-frame>
        -->
        <!-- 
            含有日期、关键字搜索的通用搜索框。
            @search 点击搜索时触发
            @date-start 日期搜索条件的值，格式是：yyyy-MM-dd
            @like-text  关键字的值
        <common-input v-on:search="onSearch" v-bind:date-start="createTimeStart" v-bind:like-text="likeText"></common-input>
        -->
        <!--
            这是一个上传图片的组件。
            @preview-size 上传组件的宽度。
            @cut    是否启用裁剪功能
            @path-name  上传图片的路径
            @img-name   上传的文件名
            @thumbnail-name 上传的文件名
        <upload-img preview-size="160px" v-bind:cut="true" path-name="test" v-bind:img-name.sync="imgName" v-bind:thumbnail-name.sync="thumbnailName"></upload-img>
        -->
        <!--
            这是车牌号码内容输入键盘
        -->
        <car-no-keyboard></car-no-keyboard>
    </div>
</template>
<script>
export default {
    data(){
        return {
            likeText:'',
            createTimeStart:null,
            imgName:null,
            thumbnailName:null
        };
    },
    methods:{
        rightCallback(){
            alert('asdasdasd');
        },
        onSearch(a,b,c){
            debugger;
        },
    }
}
</script>

<template>
    <div>
        <!--  
            通用的外框，参数如下
            @title  大标题
            @show-back  是否显示后退按钮
            @rightCallback  右边点击事件
            @right-icon-name    右边字体图标
            @tabs   下标签列表，name（标签调用的组件名称）,icon（标签图标）,info（标题数字提示）,title（标签描述）
            @select-tab 选中标签，通过添加.sync后缀以实现双向绑定
        -->
        <common-out-frame title="测试标题" v-bind:show-back="true" v-on:rightCallback="rightCallback" right-icon-name="search" 
        v-bind:tabs="[
            {name:'home',icon:'home-o',info:'5',title:'回家'},
            {name:'search',icon:'search',info:'10',title:'搜索'},
            {name:'friends',icon:'friends-o',info:'20',title:'群架'},
            {name:'setting',icon:'setting-o',info:'40',title:'设置'}
        ]" select-tab="home"></common-out-frame>
    </div>
</template>
<script>
export default {
    methods:{
        rightCallback(){
            alert('asdasdasd');
        }
    },
    data(){
        return {
        };
    },
}
</script>

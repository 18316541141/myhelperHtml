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
            顶部选项卡
            @title  大标题
            @show-back  是否显示后退按钮
            @rightCallback  右边点击事件
            @right-icon-name    右边字体图标
        <top-frame title="测试标题" v-bind:show-back="true" v-on:rightCallback="rightCallback" right-icon-name="search"></top-frame>
        -->
        <!-- 
            含有日期、关键字搜索的通用搜索框。
            @search 点击搜索时触发
            @date-start 日期搜索条件的值，格式是：yyyy-MM-dd
            @like-text  关键字的值
            @current 是否指代当前时间单位。例如：一周内，当current=true，仅包含当前周，当current=false,包含7天前到今天。
            @placeholder 模糊搜索框的文字提示。
        <common-input v-on:search="onSearch" v-bind:date-start.sync="createTimeStart" v-bind:like-text="likeText"></common-input>
        -->
        <!--
            状态、关键字的搜索框
            @search 点击搜索时触发
            @options 状态选项，name是状态的描述，value是状态的值
            @status 状态
            @like-text 关键字的值
        <status-input v-on:search="onSearch" v-bind:options="[{name:'启用',value:1},{name:'禁用',value:0}]" v-bind:status.sync="status" v-bind:like-text="likeText"></status-input>
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
            @finish 当输入的值是个车牌号码时，触发回调
        <car-no-keyboard v-on:finish="finish"></car-no-keyboard>
        -->
        <!--
            这是一个滚动分页组件
            @url    分页查询url
            @post-data  请求参数
            @load   每次加载完后回调。
        <scroller-page url="/api/IRobotQrCodePayTask/page"  v-bind:post-data="postData"  v-on:load="load">
            <div v-for="(irobotQrCodePayTask) in pageDataList" v-bind:key="irobotQrCodePayTask.irOrderNo">
                <div>{{irobotQrCodePayTask.irOrderNo}}</div>
            </div>
        </scroller-page>
        -->
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            postData:{},
            retData:{},
            likeText:'',
            createTimeStart:null,
            imgName:null,
            thumbnailName:null,
            pageDataList:[],
            status:null,
        };
    },
    methods:{
        load(retData){
            this.pageDataList.push(...retData.pageDataList);
        },
        finish(val){
            debugger;
        },
        rightCallback(){
            alert('asdasdasd');
        },
        onSearch(a,b,c){
            this.status;
            debugger;
        },
    }
}
</script>

<template>
    <div>
        <div class="scroll-top" style="height:46px;">
            <van-nav-bar v-bind:title="title" v-bind:left-text="showBack?'返回':''" v-bind:left-arrow="showBack" v-on:click-left="back" v-on:click-right="clickRight">
                <van-icon v-bind:name="rightIconName" slot="right"/>
            </van-nav-bar>
        </div>
        <div class="scroll-center" style="top:46px;bottom:50px;">
            <keep-alive>
                <component v-bind:is="active"></component>
            </keep-alive>
        </div>
        <div class="scroll-bottom" style="height:50px;">
            <van-tabbar v-model="active" v-on:change="change">
                <van-tabbar-item v-for="(tab,index) in tabs" v-bind:key="index" v-bind:name="tab.name" v-bind:icon="tab.icon" v-bind:info="tab.info">{{tab.title}}</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<script>
export default {
    props:['title','showBack','rightIconName','rightCallback','tabs','selectTab'],
    data(){
        return {active:this.selectTab};
    },
    methods:{
        clickRight(){
            this.$emit('rightCallback');
        },
        back(){
            history.back();
        },
        change(name){
            this.active=name;
            this.$emit("update:selectTab", name);
        }
    }
}
</script>
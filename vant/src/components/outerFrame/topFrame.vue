<template>
    <div>
        <div class="scroll-top" style="height:46px;">
            <van-nav-bar v-bind:title="title" v-bind:left-text="showBack?'返回':''" v-bind:left-arrow="showBack" v-on:click-left="$router.go(-1)" v-on:click-right="clickRight">
                <van-icon v-bind:name="rightIconName" slot="right"/>
            </van-nav-bar>
        </div>
    </div>
</template>
<script>
export default {
    props:['title','showBack','rightIconName','rightCallback'],
    data(){
        return {};
    },
    methods:{
        clickRight(){
            this.$emit('rightCallback');
        },
        change(name){
            this.active=name;
            this.$emit("update:selectTab", name);
        }
    }
}
</script>
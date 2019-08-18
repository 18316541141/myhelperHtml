<template>
    <div>
        <van-search v-bind:placeholder="placeholder" v-model="value" show-action shape="round">
            <span slot="label" v-on:click="show=true" v-text="name"></span>
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-action-sheet title="请选择" v-on:search="onSearch" v-model="show" v-bind:actions="options" v-on:select="onSelect"/>
    </div>
</template>
<script>
export default {
    props:['options','status','likeText','placeholder','current'],
    data(){
        return {
            name:this.options[0].name,
            value:null,
            show:false,
        };
    },
    watch:{
        value(val){
            this.$emit('update:likeText',val);
        }
    },
    methods:{
        onSearch(event){
            this.$emit('search',event);
        },
        onSelect(action){
            this.show=false;
            this.name=action.name;
            this.$emit('update:status',action.value);
        }
    }
}
</script>
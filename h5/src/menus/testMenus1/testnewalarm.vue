<template>
    <div>
        <el-button v-on:click="add">点击</el-button>
    </div>
</template>
<script>
export default {
    name:'n11',
    methods:{
        add(){
            this.$getUpdate(this.$store.state.proxyApi+'/newAlarm/add', {},function(){

            }, ['newsAlarm']);
        }
    }
}
</script>

<template>
    <div>
        <van-list v-model="loading" v-bind:finished="finished" finished-text="没有更多了" v-on:load="onLoad">
            <slot></slot>
        </van-list>
    </div>
</template>
<script>
export default {
    props:['url','postData'],
    data(){
        return {
            data:{
                currentPageIndex:1,
                totalItemCount:0,
                totalPageCount:0,
                pageSize:20
            },
            finished:false,
            loading:false,
        };
    },
    methods:{
        onLoad(){
            this.postData.currentPageIndex=this.data.currentPageIndex;
            this.postData.pageSize=this.data.pageSize;
            this.$post(this.url,this.postData,function(result){
                var data=result.data;
                this.$emit('load',data);
                this.finished=this.data.currentPageIndex*this.data.pageSize>=data.totalItemCount;
                this.data.currentPageIndex++;
                this.loading=false;
            });
        }
    },
    mounted(){
        if(this.postData===undefined){
            this.postData={};
        }
    }
}
</script>
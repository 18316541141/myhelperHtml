<template>
    <div>
        <el-table v-bind:data="retData_.data.pageDataList" style="width: 100%" size="mini" v-bind:height="tableHeight_" v-bind:select-on-indeterminate="true" v-bind:border="true" v-on:sort-change="sortChange" v-on:selection-change="selectionChange"
            header-cell-class-name="header-height-fit">
            <el-table-column type="selection" fixed="left" width="35px" v-if="showChecked"></el-table-column>
            <slot></slot>
        </el-table>
        <el-pagination v-if="retData_.data.totalItemCount>0" v-bind:current-page="retData_.data.currentPageIndex" v-bind:total="retData_.data.totalItemCount" layout="sizes, prev, pager, next, jumper, ->, total, slot"
                v-bind:page-size="retData_.data.pageSize" v-bind:background="true" v-bind:page-count="retData_.data.totalPageCount" v-bind:page-sizes="[20,40,60,80,100]"
                v-on:size-change="sizeChange" v-on:current-change="currentChange" v-on:prev-click="currentChange" v-on:next-click="currentChange"></el-pagination>
    </div>
</template>
<script>
export default {
    name:'defaultPage',
    props:['url','postData','retData','reduceHeight','checkedDatas','showChecked','tableHeight'],
    data(){
        return {
            tableHeight_:this.tableHeight===undefined?window.innerHeight-148-this.reduceHeight+'px':this.tableHeight,
            retData_:{
                data:{
                    currentPageIndex:1,
                    totalItemCount:0,
                    totalPageCount:0,
                    pageSize:20,
                    pageDataList:[]
                }
            }
        };
    },
    methods:{
        sizeChange(pageSize){
            this.retData_.data.pageSize=pageSize;
            this.refresh();
        },
        currentChange(currentPageIndex){
            this.retData_.data.currentPageIndex=currentPageIndex;
            this.refresh();
        },
        refresh(){
            var thiz=this;
            this.postData.currentPageIndex = this.retData_.data.currentPageIndex;
            this.postData.pageSize=this.retData_.data.pageSize;
            this.$post(this.url,this.postData,function(result){
                thiz.retData_=result;
                thiz.$emit('update:retData',result);
                if(thiz.tableHeight===undefined){
                    thiz.tableHeight_=window.innerHeight-148-thiz.reduceHeight+'px';
                }
            });
        },
        sortChange(sortObj){
            for (var key in this.postData) {
                if (this.postData.hasOwnProperty(key) && key.indexOf('orderBy') === 0) {
                    this.postData[key] = false;
                }
            }
            if(sortObj.order==='descending'){
                this.postData['orderByDesc.'+sortObj.prop]=true;
            }else if(sortObj.order==='ascending'){
                this.postData['orderByAsc.'+sortObj.prop]=true;
            }
            this.refresh();
        },
        selectionChange(selection){
            this.$emit('update:checkedDatas',selection);
        }
    },
    mounted(){
        this.refresh();
        var thiz=this;
        window.addEventListener('resize',function() {
            if(thiz.tableHeight===undefined){
                thiz.tableHeight_=window.innerHeight-148-thiz.reduceHeight+'px';
            }
        },false);
    }
}
</script>
<style>
.header-height-fit>.cell{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

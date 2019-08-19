<template>
    <div>
        <el-dialog title="导出excel列表" v-bind:visible.sync="exportDialog" v-bind:modal-append-to-body="true"
            v-bind:append-to-body="true" width="500px">
            <el-table v-bind:data="exportList" height="350px">
                <el-table-column property="text" label="内容" width="360px"></el-table-column>
                <el-table-column property="index" label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-download" @click="exportExcel(scope.row.index,scope.row.excelType)">导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-table v-bind:data="retData_.data.pageDataList" style="width: 100%" size="mini" v-bind:height="tableHeight_" v-bind:select-on-indeterminate="true" v-bind:border="true" v-on:sort-change="sortChange" v-on:selection-change="selectionChange"
            header-cell-class-name="header-height-fit">
            <el-table-column type="selection" fixed="left" width="39px" v-if="showChecked"></el-table-column>
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
    props:['url','postData','retData','reduceHeight','checkedDatas','showChecked','tableHeight','excelTitle','exportUrl'],
    data(){
        return {
            exportList:[],
            exportDialog:false,
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
        exportExcel(currentPageIndex,excelType){
            this.postData.currentPageIndex = currentPageIndex;
            this.postData.pageSize=this.retData_.data.pageSize;
	    this.postData.excelType=excelType;
            postOpenWin(this.exportUrl, this.postData);
        },
        export(excelType){
            var totalItemCount=this.retData_.data.totalItemCount;
            if(totalItemCount<=10000){
                this.exportExcel(1,excelType);
            }else{
                this.exportList.splice(0);
                var exportLen = ((totalItemCount-totalItemCount%10000)/10000)+1;
                for(var i=0;i<exportLen;i++){
                    this.exportList.push({text:'“'+this.excelTitle+'”第'+(i*10000+1)+'-'+Math.min((i+1)*10000,totalItemCount)+'条数据',index:i,excelType:excelType});
                }
                this.exportDialog=true;
            }
        },
        sizeChange(pageSize){
            this.retData_.data.pageSize=pageSize;
            this.search();
        },
        /**
         * 当前页码发生变化时触发
         */
        currentChange(currentPageIndex){
            this.retData_.data.currentPageIndex=currentPageIndex;
            this.search();
        },
        /**
         * 刷新列表，和查询的区别在于会清除查询参数
         */
        refresh(){
            for(var key in this.postData){
                if(this.postData.hasOwnProperty(key)){
                    if(key==='currentPageIndex'){
                        this.postData.currentPageIndex=1;
                    }else if(key==='pageSize'){
                        continue;
                    }else{
                        this.postData[key]='';
                    }
                }
            }
            this.search();
        },
        /**
         * 查询列表
         * @param {*} loadAni 刷新时是否显示加载动画，默认是显示
         */
        search(loadAni){
            if(loadAni===undefined){
                loadAni=true;
            }
            this.postData.currentPageIndex = this.retData_.data.currentPageIndex;
            this.postData.pageSize=this.retData_.data.pageSize;
            this.$post(this.url,this.postData,function(result){
                this.retData_=result;
                this.$emit('update:retData',result);
                if(this.tableHeight===undefined){
                    this.tableHeight_=window.innerHeight-148-this.reduceHeight+'px';
                }
            },loadAni);
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
            this.search();
        },
        selectionChange(selection){
            this.$emit('update:checkedDatas',selection);
        }
    },
    mounted(){
        this.search();
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

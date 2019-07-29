<template>
    <div class="tree-container">
        <div class="left-tree">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <div class="left-tree-contain">
                <div class="left-tree-inner-contain" v-bind:style="{height:height}">
                    <el-tree node-key="id" v-bind:data="treeData" v-bind:props="defaultProps" ref="tree" draggable v-on:node-click="nodeClick" v-on:node-drag-start="nodeDragStart" v-on:node-drop="nodeDrop" v-bind:filter-node-method="filterNodeMethod"></el-tree>
                </div>
            </div>
        </div>
        <div class="right-content" ref="rightContent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { types } from 'util';
export default {
    name:'treeForm',
    props:['url'],
    data(){
        return {
            height:'0px',
            filterText:'',
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            //每次进行拖动操作时，会记录拖动前节点位置，用于还原节点
            dragInfo:{
                nextSibling:null,
                previousSibling:null,
                parent:null,
                node:null
            }
        };
    },
    methods:{
        add(data,target,type){
            if(type==='inner'){
                this.$refs.tree.append(data,target);
            }else if(type==='before'){
                this.$refs.tree.insertBefore(data,target);
            }else if(type==='after'){
                this.$refs.tree.insertAfter(data,target);
            }
        },
        remove(data){
            this.$refs.tree.remove(data);
        },
        nodeClick(data,node,nodeComponent){
            this.$emit('nodeClick',data,node,nodeComponent);
        },
        back(){
            var dragInfo=this.dragInfo;
            this.$refs.tree.remove(dragInfo.node.data);
            if(dragInfo.nextSibling!==null && dragInfo.nextSibling!==undefined){
                this.$refs.tree.insertBefore(dragInfo.node.data,dragInfo.nextSibling);
            }else if(dragInfo.previousSibling!==null && dragInfo.previousSibling!==undefined){
                this.$refs.tree.insertAfter(dragInfo.node.data,dragInfo.previousSibling);
            }else if(dragInfo.parent!==null && dragInfo.parent!==undefined){
                this.$refs.tree.append(dragInfo.node.data,dragInfo.parent);
            }
        },
        nodeDragStart(node){
            this.dragInfo.node=node;
            this.dragInfo.nextSibling=node.nextSibling;
            this.dragInfo.previousSibling=node.previousSibling;
            this.dragInfo.parent=node.parent;
        },
        nodeDrop(before,after,inner,event){
            this.$emit('drop',before,after,inner,event);
        },
        filterNodeMethod(value, data, node){
            return node.data.name.indexOf(value)>-1;
        }
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted(){
        this.height=this.$refs.rightContent.offsetHeight-50+'px';
        var thiz=this;
        this.$get(this.url,function(result){
            thiz.treeData=result.data;
        });
    }
}
</script>
<style>
.tree-container{
    position:relative;
}
.tree-container>.left-tree{
    width: 200px;
}
.tree-container>.left-tree>.left-tree-contain{
    width: 198px;
    margin-top:10px;
    overflow-x: hidden;
    border:1px solid #DCDFE6;
}
.tree-container>.left-tree>.left-tree-contain>.left-tree-inner-contain{
    width:218px;
    overflow-y: scroll;
}
.tree-container>.right-content{
    position: absolute;
    left:200px;
    top:1px;
}
</style>

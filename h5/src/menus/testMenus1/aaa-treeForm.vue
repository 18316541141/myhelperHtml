<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>树表单</el-breadcrumb-item>
        </el-breadcrumb>
        <!--
            这是一个树表单控件
            url 树加载的url，如果有参数，则在url中添加
            drop 节点拖拽释放的回调函数，参数是：before（被拖拽节点对应的 Node）,after（结束拖拽时最后进入的节点）,inner（被拖拽节点的放置位置（before、after、inner））,event。
            nodeClick 节点点击时触发函数，参数是：data（节点数据）,node（节点对象）,nodeComponent（节点的组件对象）
        -->
        <tree-form url="/api/index/loadTreeNode" v-on:drop="drop" ref="treeForm" v-on:nodeClick="nodeClick">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </tree-form>
    </div>
</template>
<script>
import treeForm from '../../components/treeForm.vue'
import { setTimeout } from 'timers';
    export default{
        name:'m101',
        components:{treeForm},
        data() { 
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        methods:{
            onSubmit() {
                console.log('submit!');
            },
            nodeClick(data,node,nodeComponent){
                debugger;
                // this.$refs.treeForm.remove(data);
                // this.$refs.treeForm.add({id:'asd',name:'asdasd'},node,'inner');
            },
            drop(before,after,inner,event){
                var thiz=this;
                setTimeout(function(){
                    //还原最近一次拖动节点的历史纪录，如果最近拖动了两次以上，则只能还原最近的一次。
                    thiz.$refs.treeForm.back();
                },3000);
            }
        },
        mounted() {
        }
    };
</script>
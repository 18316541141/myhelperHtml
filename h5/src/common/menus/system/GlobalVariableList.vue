<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统全局变量</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form ref="form" v-bind:model="formData" label-width="80px">
        <el-form-item :label="'变量'+(index+1)" v-for="(globalVariable,index) in formData.globalVariableList" :key="index">
            
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        return {
            formData: {
                globalVariableList:[{ varName: '', varValue: '' }]
            }
        };
    }
};
</script>
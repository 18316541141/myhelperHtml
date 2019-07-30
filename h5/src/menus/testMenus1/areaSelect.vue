<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>地区选择</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-bind:model="form">
            <area-select ref="as1" type="form" deep="3" v-bind:province="form.myProvince" v-bind:city="form.myCity" v-bind:county="form.myCounty"></area-select>
        </el-form>
    </div>
</template>
<script>
    export default{
        name:'m15',
        data() { return { form: { myProvince: '', myCity: '', myCounty: '' } }; },
        mounted() {
            var thiz = this;
            thiz.$refs.as1.setVal('19','202','1787');
        }
    };
</script>
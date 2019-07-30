<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>常用统计图</el-breadcrumb-item>
        </el-breadcrumb>
        <!--
            这是饼状图的组件
            title：饼状图标题
            pie-data：饼状图数据，该数据需要由父组件提供：
                例如：myPieData=[{
                    name: '乐车邦',
                    y: 61.41
                }, {
                    name: '好车帮',
                    y: 11.84
                }, {
                    name: '豪车邦',
                    y: 10.85
                }, {
                    name: '4S店',
                    y: 4.67
                }, {
                    name: '5S店',
                    y: 4.18
                }, {
                    name: '美国交警网',
                    y: 7.05
                }];
            name表示参与统计的项目名称，y表示该项目占总数比例
        -->
        <pie-chart v-bind:title="'车险收入'" v-bind:pie-data="myPieData"></pie-chart>
        <!--
            这是柱状图的组件
            title：统计内容的标题
            unit：统计内容的单位
            row-axis-title：x轴坐标的标题
            v-bind:y-axis-title：y轴坐标的标题
            histogram-data：柱状图数据
        -->
        <histogram title="车险收入比例" unit="元" v-bind:row-axis-title="['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']" v-bind:y-axis-title="['金额（元）']" v-bind:histogram-data="myHistogramData"></histogram>
    </div>
</template>
<script>
export default {
    name:'m312',
    data(){
        return {
            myPieData:[],
            myHistogramData:[]
        };
    },
    mounted(){
        this.myPieData = [{
            name: '乐车邦',
            y: 61.41
        }, {
            name: '好车帮',
            y: 11.84
        }, {
            name: '豪车邦',
            y: 10.85
        }, {
            name: '4S店',
            y: 4.67
        }, {
            name: '5S店',
            y: 4.18
        }, {
            name: '美国交警网',
            y: 7.05
        }];
        this.myHistogramData = [{
            name: '乐车邦',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
            name: '好车帮',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
            name: '中国人寿',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
            name: '法国人寿',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }];
    }
}
</script>

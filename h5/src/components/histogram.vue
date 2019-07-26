<template>
    <div v-bind:id="'histogram'+id"></div>
</template>
<script>
import UUID from '../utils/UUID.js'
import Highcharts from 'highcharts'
export default {
    name:'histogram',
    props: ['title', 'unit', 'rowAxisTitle', 'yAxisTitle', 'histogramData'],
    data() {
        return { id: new UUID().id };
    },
    watch: {
        histogramData: function (val) {
            Highcharts.chart('histogram' + this.id, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.title
                },
                xAxis: {
                    categories: this.rowAxisTitle,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: this.yAxisTitle//'降雨量 (mm)'
                    }
                },
                tooltip: {
                    // head + 每个 point + footer 拼接成完整的 table
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} ' + this.unit + '</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: val
            });
        }
    }
}
</script>

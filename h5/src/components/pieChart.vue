<template>
    <div v-bind:id="'pieChart'+id"></div>
</template>
<script>
import UUID from '../utils/UUID.js'
import Highcharts from 'highcharts'
export default {
    name:'pieChart',
    props: ['title', 'pieData'],
    data() {
        return { id: new UUID().id};
    },
    watch:{
        pieData: function (val) {
            Highcharts.chart('pieChart' + this.id, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: this.title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: val
                }]
            });
        }
    }
}
</script>


<template>
    <div v-bind:id="'pieChart'+id"></div>
</template>
<script>
export default {
    name:'pieChart',
    props: ['title', 'pieData'],
    data() {
        return { id: this.$UUID()};
    },
    watch:{
        pieData: function (val) {
            this.$Highcharts.chart('pieChart' + this.id, {
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


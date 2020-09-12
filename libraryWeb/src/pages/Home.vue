<template>
    <div class="echarts">
        <div class="chart" ref="userDistribution" style="width: 800px;height:600px;" ></div>
        <!-- <div class="chart" ref="proClass" style="width: 800px;height:600px;" ></div> -->
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    mounted() {
        this.getUserPillar()
        // this.getProClassPillar()
    },
    methods: {
        getUserPillar() {
            let that = this;
            // 基于准备好的dom(myEchartPillar)，初始化echarts实例
            let myChart = echarts.init(this.$refs.userDistribution);
                myChart.setOption({
                title: {
                    text: '系统用户分布',
                    // subtext: '纯属虚构',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['系统管理员', '普通用户', 'VPI用户', '超级VPI', '至尊VIP']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 335, name: '系统管理员'},
                            {value: 310, name: '普通用户'},
                            {value: 234, name: 'VPI用户'},
                            {value: 135, name: '超级VPI'},
                            {value: 1548, name: '至尊VIP'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        
    
    }
}
</script>
<style>
 body,html{
     font-size:30px;
 }
 .echarts{
     height: 100%;
     width: 100%;
     /* background: ; */
 }
</style>
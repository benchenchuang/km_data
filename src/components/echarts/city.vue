<template>
    <div>
        <div class="trend_box" v-show="!noData" v-echarts="ChartOptions"></div>
        <no-data class="no_data" v-if="noData"></no-data>
    </div>
</template>
<script>
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
import NoData from '@/components/noData';
export default {
    name:"City",
    props:['city'],
    components:{
        NoData
    },
    directives: {
        'echarts': V_Echarts
    },
    data(){
        return{
            ChartOptions:{},
            noData:false
        }
    },
    mounted(){
        this.setOption(this.city)
    },
    methods:{
        setOption(areaData){
            let lineColor="#ff3f13";
            let hellXData=[];
            let hellYData=[];
            if(areaData){
                areaData.forEach(function(item){
                    hellXData.push(item.area);
                    hellYData.push(item.num);
                })                 
            }else{
                this.noData=true;
            }
            let option = {
                grid: {
                    left: '0',
                    right: '0',
                    bottom: '0',
                    top: '30',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: "{b}: {c}%",
                    show:true
                },
                xAxis: {
                    data: hellXData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#e4e4e4'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: lineColor,
                        rotate: 40,
                        interval: 0,
                        lineStyle:{
                            color:'#eee'
                        }
                    },
                    max: 10
                },
                yAxis: {
                    name: '单位：%',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: lineColor,
                        lineStyle:{
                            color:'#eee'
                        }
                    },
                },
                color: [lineColor],
                series: [{
                    name: 'hill',
                    type: 'pictorialBar',
                    barCategoryGap: '-130%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: hellYData,
                    z: 10
                }]
            };

            this.ChartOptions=option;
        }
    }
}
</script>
<style lang="less" scoped>
    .trend_box{
        margin-top: 3vw;
        padding: 0 4vw;
        height: 65vw;
        width: 100%;
        box-sizing: border-box;
    }
</style>



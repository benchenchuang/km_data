<template>
    <div>
        <div v-show="showEchart" class="trend_box" v-echarts="barChartOptions"></div>
        <no-data v-show="!showEchart" title="数据错误，请联系客服"></no-data>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
import NoData from '../noData'
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
export default {
    components:{NoData},
    name:"trendCharts",
    props:['id','type','day'],
    directives: {
         'echarts': V_Echarts
     },
    data(){
        return{
           barChartOptions:{},
           showEchart:true
        }
    },
    mounted(){
        this.getKolFollowData(this.id,this.day,this.type)
    },
    methods:{
        getKolFollowData(id,days,type){
            Axios.getKolFollowData({kolId:id,size:days,type:type}).then(res=>{
                if(res.errorCode==200){
                    this.setOption(res.data.x,res.data.y);
                }else{
                    this.showEchart=false;
                }
            })
        },
        setOption(xData,yData){
            let lineColor="#ff3f13";
            let areaStyle={
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 63, 19, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(255, 63, 19, 0.04)'
                    }], false)
                }
            };
            let option={
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: lineColor
                        }
                    },
                    formatter: function(value){
                        console.log(value)
                        return (value[0].data/10000).toFixed(2)+"w";
                    },
                },
                title: {
                    text: '粉 丝 趋 势',
                    show:false
                },
                grid: {
                    left: '20',
                    right: '20',
                    bottom: '10',
                    top: '20',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#e4e4e4'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14,
                            color: '#666'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    data:xData
                }],
                yAxis: [{
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#e4e4e4'
                        }
                    },
                    axisLabel: {
                        margin: 4,
                        textStyle: {
                            fontSize: 14,
                            color: '#666'
                        },
                        formatter: function(value){
                            return value/10000+"w";
                        },
                    }
                }],
                series: [{
                    name: '粉丝趋势',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    showSymbol: true,
                    animationDelay: 0,
                    animationDuration: 1000,
                    symbolSize: '6',
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'}
                    //     ],
                    //     animationDelay: 1000,
                    //     animationDuration: 1000
                    // },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2, //折线宽度
                            },
                            color: lineColor
                        }
                    },
                    areaStyle:areaStyle,
                    data: yData
                } ]
            }
            this.barChartOptions=option;
        }
    }
}
</script>
<style lang="less" scoped>
    .trend_box{
        padding-top:3vw;
        height: 60vw;
    }
</style>


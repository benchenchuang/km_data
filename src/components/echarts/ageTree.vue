<template>
    <div v-if="!noData">
        <h3 class="item_title">年龄分布</h3>
        <div class="trend_box" v-echarts="ChartOptions"></div>
    </div>
</template>
<script>
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
import NoData from '@/components/noData';
export default {
    name:"AgeTree",
    props:['agex','agey'],
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
        this.setOption(this.agex,this.agey);
    },
    methods:{
        setOption(ageX,ageY){
            let agePercent =[];
            let ageTotal
            if(ageY){
                ageTotal=ageY.reduce((ageTotal,item)=>{
                    return ageTotal+parseFloat(item);
                },0)
            }else{
                this.noData=true;
                this.$emit('onData',2)
            }
            for(let i=ageY.length-1;i>=0;i--){
                let agePer=(ageY[i]/ageTotal).toFixed(2)*100;
                agePercent.push(agePer);
            };
            //年龄段
            let agePeriod=[];
            for(var i=ageX.length-1;i>=0;i--){
                agePeriod.push(ageX[i])
            };
            let option = {
                grid:{
                    left:0,
                    right:0,
                    top:30,
                    bottom:20,
                    containLabel:true,
                },
                tooltip:{
                    show:false,
                    formatter: function(item){
                        return item.data.toFixed(2)+'%';
                    }
                },
                xAxis: {
                    data: agePeriod,
                    axisLabel: {
                        textStyle: {
                            color: '#aaa'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color:'#eee'
                        }
                    },
                    z: 10
                },
                yAxis: {
                    name: '单位：%',
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#eee'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color:'#aaa'
                        }
                    }
                },
                series: [
                    {
                        type: 'bar',
                        barMaxWidth:"30",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#fcc580'},
                                        {offset: 1, color: '#ff4316'}
                                    ]
                                )
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#ff4316',
                                fontSize: 12
                            },
                            formatter: function(item){
                                return item.data.toFixed(2)+'%';
                            }
                        },
                        data: agePercent
                    }
                ]
            };
            this.ChartOptions=option;
        }
    },
    filters:{
        fansPercent(num){
            return (num*100).toFixed(2)+'%';
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
    .no_data{
        margin-top: -60vw;
    }
    .item_title{
        position:relative;
        margin:2vw 4vw;
        font-size:4vw;
        color:#333;
    }
    .item_title:before{
        content:'';
        position:absolute;
        left:0;
        top:5.5vw;
        width:6vw;
        height:2px;
        background:#ff3f13;
    }
</style>



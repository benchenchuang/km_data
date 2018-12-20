<template>
    <div>
        <div class="trend_box" v-echarts="ChartOptions"></div>
    </div>
</template>
<script>
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
export default {
    name:"StarPie",
    props:['starPie'],
    directives: {
        'echarts': V_Echarts
    },
    data(){
        return{
            ChartOptions:{},
        }
    },
    mounted(){
        this.setOption(this.starPie);
    },
    methods:{
        setOption(data){
            //星座名称配置
            let constellationIcons=[
                {
                    name:'白羊座',
                    icon:require('../../assets/images/xingzuo/baiyang.png'),
                    padding:[0,20,0,32],
                    width:-22,
                    height:30
                },
                {
                    name:'摩羯座',
                    icon:require('../../assets/images/xingzuo/mojie.png'),
                    padding:[7,20,0,32],
                    width:-22,
                    height:23
                },
                {
                    name:'水瓶座',
                    icon:require('../../assets/images/xingzuo/shuiping.png'),
                    padding:[14,20,0,30],
                    width:-20,
                    height:16
                },
                {
                    name:'双鱼座',
                    icon:require('../../assets/images/xingzuo/shuangyu.png'),
                    padding:[24,20,0,22],
                    width:-12,
                    height:6
                },
                {
                    name:'金牛座',
                    icon:require('../../assets/images/xingzuo/jinniu.png'),
                    padding:[30,0,0,0],
                    width:30,
                    height:0
                },
                {
                    name:'双子座',
                    icon:require('../../assets/images/xingzuo/shuangzi.png'),
                    padding:[26,24,0,22],
                    width:-16,
                    height:4
                },
                {
                    name:'巨蟹座',
                    icon:require('../../assets/images/xingzuo/juxie.png'),
                    padding:[14,32,0,30],
                    width:-32,
                    height:16
                },
                {
                    name:'狮子座',
                    icon:require('../../assets/images/xingzuo/shizi.png'),
                    padding:[7,33,0,22],
                    width:-25,
                    height:23
                },
                {
                    name:'处女座',
                    icon:require('../../assets/images/xingzuo/chunv.png'),
                    padding:[0,31,0,22],
                    width:-23,
                    height:30
                },
                {
                    name:'天秤座',
                    icon:require('../../assets/images/xingzuo/tiancheng.png'),
                    padding:[-6,28,0,22],
                    width:-20,
                    height:36
                },
                {
                    name:'天蝎座',
                    icon:require('../../assets/images/xingzuo/tianxie.png'),
                    padding:[-16,28,0,22],
                    width:-20,
                    height:46
                },
                {
                    name:'射手座',
                    icon:require('../../assets/images/xingzuo/sheshou.png'),
                    padding:[-6,20,0,30],
                    width:-20,
                    height:36
                }
            ];
            let starData=[];
            let allStars
            if(data){
                allStars=data.reduce((allStars,item)=>{
                    return allStars+parseFloat(item);
                },0)
            }
            for(let i=0;i<data.length;i++){
                let thisPercent=(data[i]*100/allStars).toFixed(2);
                starData.push(thisPercent);
            };
            let constellationValue=starData;
            let constellationData=[]
            // 星座名属性
            let constellationName=[];
            constellationIcons.forEach(function(item,index){
                constellationName.push({
                    value:item.name,
                    name:item.name,
                    textStyle: {
                        padding:item.padding,
                        width: item.width,
                        height: item.height,
                        align:'left',
                        backgroundColor: {
                            image:item.icon,
                        },
                        rich: {
                        },
                    } 
                })
            })
            constellationValue.forEach(function(item,index){
                constellationData.push({
                    value: item,
                    itemStyle: {
                        normal: {
                            color:'rgba(255,63,19,.6)'
                        }
                    }
                })
            })
            let option = {
                tooltip: {
                    formatter: "{b}: {c}%",
                    show:true
                },
                grid:{
                    left: '20',
                    right: '20',
                    bottom: '20',
                    top: '20',
                    containLabel: true,
                },
                angleAxis: {
                    startAngle:45,
                    interval: 1,
                    type: 'category',
                    data: constellationName,
                    z:9,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 2,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        inside:false,
                        color: "#ccc",
                        margin: -15,
                        fontSize: 12
                    }
                },
                radiusAxis: {
                    max:function(value){
                        var maxNum=parseInt(value.max);
                        return maxNum+5-(maxNum%5);
                    },
                    interval:5,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#e4e4e4",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: true,
                        color: "#a2a2a2",
                        fontSize: 12
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#e4e4e4",
                            width: 1,
                            type: "solid"
                        }
                    },
                },
                polar: {},
                series: [{
                    type: 'bar',
                    data: constellationData,
                    coordinateSystem: 'polar',
                }],
            };
            this.ChartOptions=option;
        }
    }
}
</script>
<style lang="less" scoped>
    .trend_box{
        margin: 4vw;
        height: 78vw;
    }
</style>



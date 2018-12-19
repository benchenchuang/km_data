<template>
    <div>
        <div class="trend_box" v-echarts="ChartOptions"></div>
        <div class="gender_box flex_box">
            <div class="flex_item boy">
                <img class="icon_gender" src="../../assets/images/icon_boy.png"/>
                <p class="percent">{{boy/allFans | fansPercent}}</p>
                <p class="label">男性用户</p>
            </div>
            <div class="flex_item girl">
                <img class="icon_gender" src="../../assets/images/icon_girl.png"/>
                <p class="percent">{{girl/allFans | fansPercent}}</p>
                <p class="label">女性用户</p>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
export default {
    name:"GenderEcharts",
    props:['girl','boy'],
    directives: {
        'echarts': V_Echarts
    },
    data(){
        return{
            ChartOptions:{},
            allFans:null,
        }
    },
    mounted(){
        this.allFans=parseFloat(this.boy)+parseFloat(this.girl);
        this.setOption(this.boy,this.girl);
    },
    methods:{
        setOption(boy,girl){
            function deepCopy(obj) {
                if (typeof obj !== 'object') {
                    return obj;
                }
                var newobj = {};
                for (var attr in obj) {
                    newobj[attr] = obj[attr];
                }
                return newobj;
            }
            let xData = [],
                yData = [];
            let genderData = [{
                "name": "男性",
                "value": boy
            }, {
                "name": "女性",
                "value": girl
            }];
            genderData.map((a, b) => {
                xData.push(a.name);
                yData.push(a.value);
            });
            var startColor = ['#6fc4ff', '#ff94ac'];
            var endColor = ['#50b2f7', '#fa6083'];
            var borderStartColor = ['#36a2ee','#fa5c80'];
            var borderEndColor = ['#36a2ee','#fa5c80'];
            var RealData = [];
            var borderData = [];
            genderData.map((item, index) => {
                var newobj = deepCopy(item);
                var newobj1 = deepCopy(item);
                RealData.push(newobj);
                borderData.push(newobj1);
            });
            RealData.map((item, index) => {
                item.itemStyle = {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: startColor[index] // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: endColor[index] // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    }
                }
            });
            borderData.map((item, index) => {
                item.itemStyle = {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: borderStartColor[index] // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: borderEndColor[index] // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    }
                }
            });
            var genderOption = {
                title: {
                    text: '性 别 分 布',
                    show:false
                },
                tooltip: {
                    formatter: "{a}：<br/>{b}: {d}%",
                    show:true
                },
                series: [
                    // 主要展示层的
                    {
                        name: "性别分布",
                        type: 'pie',
                        radius: ['33%', '61%'],
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                formatter: '{b}:{d}%',
                            },
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: RealData,
                    },
                    // 边框的设置
                    {
                        radius: ['31%', '34%'],
                        type: 'pie',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        animation: false,
                        tooltip: {
                            show: false
                        },
                        data: borderData
                    }
                ]
            };
            this.ChartOptions=genderOption;
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
        margin-top:-10vw;
        height: 60vw;
    }
    .gender_box{
        margin-top: -15vw;
        .flex_item{
            text-align:center;
            .icon_gender{
                width: 30px;
                height: 30px;
            }
            &.boy{
                color: #36a2ee;
            }
            &.girl{
                color: #fa5c80;
            }
            .percent{
                margin: 1.5vw 0 0;
                font-size: 4.5vw;
            }
            .label{
                font-size: 3vw;
            }
        }
    }
</style>



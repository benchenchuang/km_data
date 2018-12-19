<template>
    <div>
        <div class="trend_box" id="opinion"></div>
        <no-data class="no_data" v-if="!isKey"></no-data>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
import echarts from 'echarts';
import V_Echarts from 'vue-echarts-directive';
require('echarts-wordcloud');
import NoData from '@/components/noData';
export default {
    name:'commentCharts',
    props:['id'],
    components:{
        NoData
    },
    directives: {
        'echarts': V_Echarts
    },
    data(){
        return{
            barChartOptions:{},
            isKey:''
        }
    },
    mounted(){
        this.queryCommentKey(this.id);
    },
    methods:{
        queryCommentKey(id){
            Axios.queryCommentKey({kolId:id}).then(res=>{
                if(res.errorCode==200){
                    this.setOption(res.data);
                    try{
                        this.isKey=res.data[0].key
                    }catch(e){
                        this.isKey=""
                    }
                    this.$root.Bus.$emit('wordCloud',this.key);
                    this.$emit('getStatus')
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                }
            })
        },
        //词云数据设置
        setOption(data){
            let that=this;
            let opinionData=[];
            data.forEach(function(item){
                opinionData.push({
                    name:item.key,
                    value:item.ratio
                })
            });
            let opinionCharts= echarts.init(document.getElementById('opinion'));;
            let maskImage = new Image();
            let loveUrl =require("../../assets/images/love.png");
            maskImage.src = loveUrl;
            maskImage.onload = ()=>{
                opinionCharts.setOption({
                    title: {
                        text: '词 云 图',
                        show:false
                    },
                    grid: {
                        left: '10',
                        right: '10',
                        bottom: '10',
                        top: '-10',
                        containLabel: true
                    },
                    series: [{
                        name: '词 云 图',
                        type: 'wordCloud',
                        textRotation: [0, 0, 90, -90],
                        gridSize: 16,
                        sizeRange: [12, 25],
                        rotationRange: [0, 0],
                        shape:'pentagon',
                        width: '100%',
                        height: '100%',
                        maskImage: maskImage,
                        textPadding: [5,5],
                        autoSize: {
                            enable: true,
                            minSize: 12
                        },
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor:'#ccc'
                            }
                        },
                        data:opinionData
                    }]
                });
            };
            //云图点击事件
            opinionCharts.on('click',params=>{
                this.$root.Bus.$emit('wordCloud',params.name)
            });
        }
    }
}
</script>
<style lang="less" scoped>
.no_data{
    margin-top: -60vw;
}
.trend_box{
    padding-top:3vw;
    height: 60vw;
}
</style>



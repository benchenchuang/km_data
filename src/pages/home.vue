<template>
    <div>
        <h2 class="head">标题<span></span></h2>
        <loading></loading>
        <trend-charts type="1" day="30"></trend-charts>
        <trend-charts type="2" day="30"></trend-charts>
        <trend-charts type="3" day="30"></trend-charts>
        <error title="数据"></error>
    </div>
</template>
<script>
import Loading from '@/components/loading';
import trendCharts from '@/components/echarts/trendCharts'
import Error from './error'
import * as Axios from '@/utils/axios.js'
export default {
    components:{
        Loading,
        trendCharts,
        Error
    },
    data(){
        return{

        }
    },
    mounted(){
        this.getHotUsers();
    },
    methods:{
        getHotUsers(){
            Axios.hotUser({platform:'DOUYIN',day:'2018-12-10',page:1,limit:10}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .head{
        font-size: 18px;
        color: #333;
        span{
            font-size: 12px;
        }
    }
</style>



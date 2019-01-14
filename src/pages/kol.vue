<template>
    <div>
        <div id="capture" v-show="!dataUrl">
            <canvas-tip v-if="sharing"></canvas-tip>
            <img v-if="sharing" class="capture_head" src="../assets/images/canvas_kol_head.png"/>
            <div v-if="infoBox">
                <kol-head v-if="headActive" :id="kolId"  @setShare="getShare"></kol-head>
                <kol-tab @getActive="getTabIndex" :status="status"></kol-tab>
                <loading text="图形数据加载中" v-if="status<2"></loading>
                <div class="tab_content" :class="{'off':status<2}" v-show="tabIndex==1 || tabIndex==4">
                    <div class="analysis_box">
                        <kol-title title="数据概览"></kol-title>
                        <over-view :id="kolId"></over-view>
                    </div> 
                    <div class="analysis_box">
                        <kol-title title="粉丝数据"></kol-title>
                        <trend-charts :id="kolId" type="1" day="30"></trend-charts>
                        <p class="chart_tip">注：如粉丝趋势出现负值，表明有部分用户取消了关注</p>
                    </div>
                    <div class="analysis_box">
                        <kol-title title="互动数据分析"></kol-title>
                        <h3 class="item_title">评论趋势</h3>
                        <trend-charts :id="kolId" type="2" day="30"></trend-charts>
                        <h3 class="item_title">点赞趋势</h3>
                        <trend-charts :id="kolId" type="3" day="30"></trend-charts>
                    </div>
                    <div class="analysis_box" v-if="!sharing">
                        <kol-title title="视频精选"></kol-title>
                        <h3 class="item_title">最热视频</h3>
                        <kol-video :id="kolId" type="1"></kol-video>
                        <h3 class="item_title">最新视频</h3>
                        <kol-video :id="kolId" type="2"></kol-video>
                    </div>
                </div>
                <div class="tab_content" :class="{'off':status<2}" v-show="tabIndex==2 || tabIndex==4">
                    <kol-title title="关键词分析"></kol-title>
                    <h3 v-show="false" class="item_title">词云图</h3>
                    <comment-charts v-show="false" :id="kolId" @getStatus="setStatus"></comment-charts>
                    <h3 v-show="false" class="item_title">评论列表</h3>
                    <kol-comments v-show="false" :id="kolId"></kol-comments>
                    <no-data title="暂无评论数据"></no-data>
                </div>
                
                <div class="tab_content" :class="{'off':status<2}" v-show="tabIndex==3 || tabIndex==4" v-if="userFollower">
                    <kol-title title="用户数据"></kol-title>
                    <gender-echarts @onData="getNoData" :boy="boy" :girl="girl"></gender-echarts>
                    <age-tree @onData="getNoData" :agex="ageTreeX" :agey="ageTreeY"></age-tree>
                    <city @onData="getNoData" :city="city"></city>
                    <star-pie @onData="getNoData" :star-pie="starPie"></star-pie>
                    <no-data v-if="portraitIndex>=4" title="暂无用户数据"></no-data>
                </div>
            </div>
            <canvas-bottom v-if="sharing"></canvas-bottom>
        </div>

        <div class="share_loading" v-if="shareLoding">
            <loading text="图片生成中"></loading>
        </div>
        <img :src="dataUrl" class="show_share" v-if="dataUrl"/>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
import KolHead from '@/components/kol/head.vue'
import KolTab from '@/components/kol/tabs.vue'
import KolTitle from '@/components/kol/title.vue'
import OverView from '@/components/kol/overview.vue'
import Loading from '@/components/loading';
import trendCharts from '@/components/echarts/trendCharts'
import commentCharts from '@/components/echarts/commentCharts'
import kolVideo from '@/components/kol/video'
import KolComments from '@/components/kol/comments'
import CanvasTip from '@/components/canvas/tip'
import CanvasBottom from '@/components/canvas/bottom'
import GenderEcharts from '@/components/echarts/gender'
import AgeTree from '@/components/echarts/ageTree'
import City from '@/components/echarts/city'
import StarPie from '@/components/echarts/starPie'
import NoData from '@/components/noData'
import html2canvas from 'html2canvas';
import {webStorage} from '../utils/webStorage.js'
export default {
    name:'KolDetail',
    components:{
        KolHead,
        KolTab,
        KolTitle,
        OverView,
        Loading,
        trendCharts,
        kolVideo,
        commentCharts,
        KolComments,
        CanvasTip,
        CanvasBottom,
        GenderEcharts,
        AgeTree,
        City,
        StarPie,
        NoData
    },
    data(){
        return{
            kolId:this.$route.params.id,
            shareLoding:false,
            dataUrl:'',
            headActive:true,
            data:{
                sort:1
            },
            tabIndex:4,
            status:0,
            sharing:false,
            userFollower:null,
            boy:'',
            girl:'',
            ageTreeX:'',
            ageTreeY:'',
            city:'',
            starPie:'',
            infoBox:true,
            portraitIndex:0
        }
    },
    watch:{
        status(){
            if(this.status>=2){
                this.tabIndex=1;
            }
        }
    },
    created(){
        let token=webStorage.getLocal('token');
        if(token){
            this.getUserInfo(token)
            if(!this.$route.params.id){
                this.$toast.center('红人详情不存在');
                return setTimeout(()=>{
                    this.$router.go(-1);
                },1000)
            }
            this.getFollower(); 
        }else{
            this.$toast.center('暂未登录');
            setTimeout(()=>{
                this.$router.push({name:'Login'});
            },1000)
        }
    },
    updated() {
        window.scroll(0, 0);
    },
    methods:{
        setStatus(){
            this.status++;
        },
        getNoData(val){
            this.portraitIndex++;
            console.log(this.portraitIndex)
        },
        getUserInfo(token){
            Axios.userInfo({token:token}).then(res=>{
                if(res.errorCode!=200){
                    this.$router.go(-1)
                }
            })
        },
        //获取用户画像信息
        getFollower(){
            Axios.getFollower({kolId:this.kolId}).then(res=>{
                if(res.errorCode==200){
                    this.userFollower=res.data;
                    try{
                        this.boy=res.data.genderPie.boy;
                        this.girl=res.data.genderPie.girl;
                        this.ageTreeX=res.data.ageTree.x;
                        this.ageTreeY=res.data.ageTree.y;
                        this.city=res.data.city;
                        this.starPie=res.data.starPie['y'];
                    }catch(e){
                        
                    }
                    setTimeout(()=>{
                        this.status++;
                    },1000)
                }
            })
        },
        //tabIndex
        getTabIndex(index){
            if(this.status<2){
                return false;
            }
            this.tabIndex=index;
        },
        // 生成分享
        getShare(){
            this.sharing=true;
            this.shareLoding=true;
            setTimeout(()=>{
                this.getCanvasShare();
            },1500)
        },
        //生成图片
        getCanvasShare(){
            html2canvas(document.querySelector("#capture"),{
                async: true,
                taintTest: true,
                useCORS: true,
                scale: 2
            }).then(canvas => {
                this.shareLoding=false;
                canvas.setAttribute('id','thecanvas');
                let strURI = canvas.toDataURL('image/png').replace("image/png","image/octet-stream");
                this.dataUrl=strURI;
                this.infoBox=false;
            });
        },
    }
}
</script>
<style lang="less" scoped>
.capture_head{
    width: 100%;
    height: 17vw;
}
.share_loading{
    position: fixed;
    left: 0;
    top: 0;
    width:100%;
    height: 100vh;
    background: #fff;
    z-index: 9;
    .loading{
        padding-top: 60vw;
    }
}
.show_share{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
}
.analysis_box{
    border-bottom:3vw solid #f8f8f8;
    .chart_tip{
        padding:3vw 0;
        text-align:center;
        font-size:3.5vw;
        color:#999;
    }
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
.tab_content{
    padding: 1vw 0;
    background: #fff;
}
.tab_content.off{
    opacity: 0;
    filter: alpha(opacity=0);
}
</style>


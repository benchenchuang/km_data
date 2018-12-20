<template>
    <div>
        <home-header @headShare="shareBtn" v-if="!getCanvas"></home-header>
        <home-filter @getParams="filterParams" :count="count" v-if="!getCanvas"></home-filter>
        <div id="capture">
            <canvas-tip v-if="getCanvas"></canvas-tip>
            
            <canvas-head :ranks="rankTops" v-if="getCanvas"></canvas-head>
            
            <rank-list v-if="getCanvas" :head="!getCanvas" :data="ranks" ></rank-list>
            <rank-list v-else :head="!getCanvas" :data="ranks" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20"></rank-list>
        
            <no-data v-if="no_data"></no-data>
            <canvas-bottom v-if="getCanvas"></canvas-bottom>
        </div>
        <p class="load_all" v-if="this.params.page>=3">--已经到底了--</p>
        <load-guide v-if="loading"></load-guide>
        <div class="share_loading" v-if="shareLoding">
            <loading text="图片生成中"></loading>
        </div>
        <img :src="dataUrl" class="show_share" v-if="dataUrl"/>
    </div>
</template>
<script>
import HomeHeader from '@/components/headers/HomeHeader'
import HomeFilter from '@/components/filters/Filter'
import CanvasHead from '@/components/ranks/canvas_head'
import RankList from '@/components/ranks/RankList'
import infiniteScroll from 'vue-infinite-scroll'
import NoData from '@/components/noData';
import Loading from '@/components/loading';
import LoadGuide from '@/components/loadGuide/rank';
import CanvasTip from '@/components/canvas/tip'
import CanvasBottom from '@/components/canvas/bottom'
import * as Axios from '../utils/axios.js'
import html2canvas from 'html2canvas';
export default {
    directives: {infiniteScroll},
    components:{
        HomeHeader,
        HomeFilter,
        NoData,
        LoadGuide,
        CanvasHead,
        RankList,
        Loading,
        CanvasTip,
        CanvasBottom
    },
    data(){
        return{
            params:{
            },
            limit:50,
            page:1,
            ranks: [],
            rankTops:[],
            busy: false,
            count:0,
            maxPage:2,
            totalPage:1,
            no_data:false,
            loading:true,
            getCanvas:false,
            shareLoding:false,
            dataUrl:'',
            shareList:true
        }
    },
    watch:{
        params:{
            handler(curVal){
　　　　　　 },
　　　　　　 deep:true
        },
    },
    mounted(){
    },
    methods:{
        shareBtn(){
            this.params.page=1;
            this.getCanvas=true;
            this.shareLoding=true;
            setTimeout(()=>{
                this.ranks=this.ranks.slice(0,50);
                this.getCanvasShare();
            },2000)
        },
        getCanvasShare(){
            var that=this;
            html2canvas(document.querySelector("#capture"),{
                async: true,
                allowTaint: false,
                taintTest: true,
                useCORS: true,
                scale: 2, 
                logging: false, 
            }).then(canvas => {
                this.shareLoding=false;
                canvas.setAttribute('id','thecanvas');
                var strURI = canvas.toDataURL('image/png');
                that.dataUrl=strURI;
                this.shareList=false;
            });
        },
        filterParams(params){
            this.totalPage=1;
            this.params=params;
            this.params.page=this.page;
            this.params.limit=this.limit;
            this.ranks=[];
            this.rankTops=[];
            this.maxPage=2,
            this.totalPage=1,
            setTimeout(()=>{
                this.loadMore();
            })
        },
        dayHotUsers(params){
            this.no_data=false;
            this.loading=true;
            Axios.dayHotUser(params).then(res=>{
                if(res.errorCode==200){
                    this.count=res.data.meta.total;
                    this.totalPage=res.data.meta.totalPage;
                    this.maxPage=this.totalPage>2?2:this.totalPage;
                    res.data.kolList.map(item=>{
                        this.ranks.push(item)
                    });
                    this.rankTops=this.ranks.slice(0,3);
                    if(!res.data.meta.total){
                        this.no_data=true;
                    };
                    this.loading=false;
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                }
            });
        },
        async loadMore(){
            if(this.totalPage>=this.params.page){
                if(this.maxPage>=this.params.page){
                    this.busy = true;
                    await this.dayHotUsers(this.params)
                    this.params.page++;
                    this.busy = false;
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
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
    right: 0;
    width: 100%;
    z-index: 999;
}
.load_all{
    padding: 2vw 0;
    font-size: 4vw;
    color: #999;
    text-align: center;
}
</style>


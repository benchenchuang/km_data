<template>
    <div class="filter_wrap">
        <div class="filter_box main_bg column">
            <div class="filter_item">
                <input id="column_1" type="radio" checked name="type" v-model="filters.column" value="1">
                <label for="column_1">红人榜</label>
            </div>
        </div>
        <div class="filter_box plat_box">
            <div class="filter_item" v-for="plat in platforms" :key="plat.id">
                <input :id="'plat_'+plat.id" type="radio" name="plat" v-model="filters.platform" :value="plat.id">
                <label :for="'plat_'+plat.id">
                    <img class="icon_plat" v-if="plat.id=='DOUYIN'" src="../../assets/images/icon_DOUYIN.png"/>
                    <img class="icon_plat" v-else-if="plat.id=='KUAISHOU'" src="../../assets/images/icon_KUAISHOU.png"/>
                    <img class="icon_plat" v-else-if="plat.id=='BILIBILI'" src="../../assets/images/icon_BILIBILI.png"/>
                    <img class="icon_plat" v-else-if="plat.id=='MEIPAI'" src="../../assets/images/icon_MEIPAI.png"/>
                    <img class="icon_plat" v-else-if="plat.id=='MIAOPAI'" src="../../assets/images/icon_MIAOPAI.png"/>
                    <img class="icon_plat" v-else-if="plat.id=='XIGUA'" src="../../assets/images/icon_XIGUA.png"/>
                    <img class="icon_plat" v-else src="../../assets/images/icon_HUOSHAN.png"/>
                    {{plat.name}}
                </label>
            </div>
        </div>
        <div class="filter_box plat_box sort_slide" :class="{'hide':isFilterMore}">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(sort, index) in category" :key="index">
                    <div class="filter_item"  @click="toSlide(index)">
                        <input :id="'sort_'+sort.id" type="radio" name="sort" v-model="filters.category" :value="sort.id">
                        <label :for="'sort_'+sort.id">
                            {{sort.name}}
                        </label>
                    </div>
                </swiper-slide>
            </swiper>
            <a class="sort_more" @click="showSort" href="javascript:void(0);"><img src="../../assets/images/icon_filter_more.png"></a>
        </div>
        <div class="filter_box plat_box sort_show" v-show="isFilterMore">
            <div class="filter_item" v-for="(sort,index) in category" :key="index" @click="selectCategory(sort.id,index)">
                <label :class="{'on':sort.id==filters.category}">
                    {{sort.name}}
                </label>
            </div>
            <a class="sort_more" @click="hideSort" href="javascript:void(0);"><img src="../../assets/images/icon_filter_more.png"></a>
        </div>
        <div class="select_box flex_box">
            更新日期：<div id="trigger" class="kol_date flex_item">{{filters.day}}</div>
            <span class="kol_num">用户样本数：{{count}}</span>
        </div>
        

    </div>
</template>
<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MobileSelect from 'mobile-select';
import * as Axios from '../../utils/axios.js'
export default {
    name:'HomeFilter',
    props:['count'],
    components: {
        swiper,
        swiperSlide
    },
    data(){
        return{
            filters:{
                column:1,
                platform:'DOUYIN',
                category:0,
                day:''
            },
            isFilterMore:false,
            platforms:[
                {
                    id:'DOUYIN',
                    name:"抖音"
                },
                {
                    id:'KUAISHOU',
                    name:"快手"
                },
                {
                    id:'BILIBILI',
                    name:"bilibili"
                },
                {
                    id:'MEIPAI',
                    name:"美拍"
                },
                {
                    id:'MIAOPAI',
                    name:"秒拍"
                },
                {
                    id:'XIGUA',
                    name:"西瓜视频"
                },
                {
                    id:'HUOSHAN',
                    name:"火山小视频"
                }
            ],
            category:[
                {
                    id:0,
                    name:"全部"
                },
                {
                    id:1,
                    name:"小姐姐"
                },
                {
                    id:2,
                    name:"小哥哥"
                },{
                    id:3,
                    name:"高颜值"
                },
                {
                    id:4,
                    name:"单身狗"
                },{
                    id:5,
                    name:"高颜值1"
                },
                {
                    id:6,
                    name:"单身狗2"
                }
            ],
            thisIndex:0,
            swiperOption: {
                slidesPerView:'auto',
                spaceBetween: 10,
                freeMode: true,
            },
        }
    },
    watch:{
        filters:{
            handler(curVal){
                this.updateParams();
　　　　　　 },
　　　　　　 deep:true
        },
    },
    mounted(){
        this.getPlatForm();
        this.getWeekMonday();
    },
    methods:{
        getPlatForm(){
            Axios.platforms().then(res=>{
                if(res.errorCode==200){
                    this.platforms=res.data;
                    this.filters.platform=res.data[0].id;
                }
            })
        },
        toSlide(i) {
            if(i>=1){
                this.$refs.mySwiper.swiper.slideTo(i-1, 300)
            }else{
                this.$refs.mySwiper.swiper.slideTo(i, 300)  
            }
        },
        updateParams(){
            this.$emit('getParams',this.filters);
        },
        showSort(){
            this.isFilterMore=true;
        },
        hideSort(){
            this.isFilterMore=false;
        },
        selectCategory(id,index){
            this.isFilterMore=false;
            this.filters.category=id;
            this.toSlide(index);
        },
        mobileSelect(){
            var that=this;
            var platDates=this.platDates;
            new MobileSelect({
                trigger: "#trigger",
                title: "选择日期",
                wheels: [
                    {data: platDates}
                ],
                position:[0],
                callback:function(indexArr, data){
                    that.filters.day=data[0];
                }
            });
        },
        getWeekMonday:function(){
            var now = new Date();
            var oneDayTime=24*60*60*1000;
            var getWeek=[];
            var len=5;
            var currentWeek = now.getDay();
            if ( currentWeek == 0 )currentWeek = 7;
            if(currentWeek>=2){
                var recentTime=now.getTime() - (currentWeek-1)*oneDayTime;
                getWeek.push(this.getDayDate(recentTime));
                len=4;
            }
            for(var i=1;i<len;i++){
                var getTimes  = now.getTime() - (currentWeek-1+7*i)*oneDayTime; //星期一
                getWeek.push(this.getDayDate(getTimes))
            }
            this.platDates=getWeek;
            this.filters.day=getWeek[0];
            this.mobileSelect();
        },
        getDayDate:function(time){
            var getDayTimes=new Date(time);
            return getDayTimes.getFullYear()+'-'+this.getDouble((getDayTimes.getMonth()+1))+'-'+this.getDouble(getDayTimes.getDate());
        },
        getDouble:function(num){
            return num<10?'0'+num:num;
        }
    }
}
</script>
<style lang="less" scoped>
@main_color:#ff3f13;
.filter_wrap{
    background: #fff;
}
.filter_box{
    padding: 2vw 0;
    &.column{
        padding: 2vw 4vw;
        display: flex;
        display: -webkit-flex;
        padding-top: 3vw;
        .filter_item{
            width: 20%;
            height: 9vw;
            line-height: 9vw;
            & > input:checked+label {
                color:#fff;
                font-size: 4.5vw;
            }
            & > input:checked+label:before{
                content: '';
                position: absolute;
                left: -1vw;
                top: 0;
                width:0;
                height:0;
                border-width:0 0 2vw 2vw;
                border-style:solid;
                border-color:transparent transparent transparent #fff;
            }
        }
    }
    &.plat_box{
        margin:0 4vw;
        border-bottom: 1px dashed #e4e4e4;
        .filter_item{
            & > label{
                margin: 2vw 2vw;
                padding: 0 2vw;
                height: 8vw;
                line-height: 8vw;
                font-size: 3.5vw;
                color: #666;
            }
            & > label .icon_plat{
                margin-right: 1vw;
                width: 5.5vw;
                height: 5.5vw;
                vertical-align: -1.8vw;
            }
            & > input:checked+label {
                background: #ffe2e2;
                border-radius: 1vw;
                color:@main_color;
            }
        }
    }
    .filter_item{
        position: relative;
        display: inline-block;
        text-align: center;
        & > label{
            position: relative;
            display: inline-block;
            text-align: center;
            font-size: 4vw;
            color: #ffe2e2;
        }
        & > input[type="radio"] {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            opacity: 0;
            z-index: 9;
            cursor: pointer;
        }
        label.on{
            color: @main_color;
            background: #ffe2e2;
        }
    }
    .sort_more{
        display: block;
        margin: 2vw auto;
        text-align: center;
        img{
            width: 4vw;
            height: 2vw;
        }
    }
    &.plat_box.sort_show{
        .sort_more{
            transform:rotateY(180deg);
            -webkit-transform:rotate(180deg);
        }
    }
}
.sort_slide{
    position: relative;
    &.hide{
        position: fixed;
        opacity: 0;
        filter: alpha(opacity=0);
    }
    .swiper-container{
        margin-right: 7vw;
    }
    .swiper-slide{
        width: auto!important;
    }
    .sort_more{
        position: absolute;
        right: 1vw;
        top: 5vw;
    }
}
.select_box{
    padding: 2vw 4vw;
    height: 8vw;
    line-height: 8vw;
    font-size: 4vw;
    background: #f8f8f8;
    color:#999;
    .kol_date{
        margin-right: 10vw;
        color: #333;
    }
}
</style>



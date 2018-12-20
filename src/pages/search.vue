<template>
    <div>
        <div class="search_head flex_box">
            <div class="search_item flex_item">
                <input type="search" v-model="keyword" placeholder="请输入红人名称"/>
            </div>
            <a href="javascript:void(0);" @click="search" class="search_btn">
                <i class="icon_search"></i>
            </a>
        </div>
        <div class="search_result">
            <p class="search_keyword" v-if="resultTip">搜索<span class="main_color">"{{keyword}}"</span>，共找到约<span>{{results.length}}</span>个结果</p>
            <div class="result_box" v-if="results.length">
                <router-link :to="{name:'KolDetail',params:{id:kol.id}}" class="result_item" v-for="(kol,index) in results" :key="index">
                    <div class="item_content flex_box">
                        <img class="avatar" v-lazy="kol.headImg"/>
                        <div class="content">
                            <p class="name">{{kol.nickName}}</p>
                            <div class="other">
                                <img class="icon" v-if="kol.platform=='DOUYIN'" src="../assets/images/icon_DOUYIN.png"/>
                                <img class="icon" v-else-if="kol.platform=='KUAISHOU'" src="../assets/images/icon_KUAISHOU.png"/>
                                <img class="icon" v-else-if="kol.platform=='BILIBILI'" src="../assets/images/icon_BILIBILI.png"/>
                                <img class="icon" v-else-if="kol.platform=='MEIPAI'" src="../assets/images/icon_MEIPAI.png"/>
                                <img class="icon" v-else-if="kol.platform=='MIAOPAI'" src="../assets/images/icon_MIAOPAI.png"/>
                                <img class="icon" v-else-if="kol.platform=='XIGUA'" src="../assets/images/icon_XIGUA.png"/>
                                <img class="icon" v-else src="../assets/images/icon_HUOSHAN.png"/>
                                <span class="week_num">周可梦指数：<span class="num">{{kol.focus}}</span></span>
                            </div>
                        </div>
                    </div>
                    <p class="item_desc">简介：{{kol.signature}}</p>
                </router-link>
            </div>
            <no-data v-if="!results.length && !searchLoding" title="暂无搜索数据"></no-data>
            <loading v-if="searchLoding" :text="'正在搜索：'+keyword"></loading>
        </div>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
import Loading from '@/components/loading';
import NoData from '@/components/noData';
export default {
    name:'Search',
    components:{
        Loading,
        NoData
    },
    data(){
        return{
            keyword:'',
            results:[],
            resultTip:false,
            searchLoding:false,
        }
    },
    methods:{
        search(){
            this.results=[];
            this.searchLoding=true;
            this.resultTip=false;
            if(!this.keyword){
                this.searchLoding=false;
                return this.$toast.center('请输入搜索内容');
            }
            Axios.search({key:this.keyword}).then(res=>{
                if(res.errorCode==200){
                    this.resultTip=true;
                    this.searchLoding=false;
                    this.results=res.data;
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .search_head{
        padding: 4vw 8vw;
        background: #fff;
        .search_item{
            input{
                display: block;
                padding:1vw 2vw 1vw 4vw;
                width: 100%;
                height: 9vw;
                line-height: 7vw;
                font-size: 3.7vw;
                background: #fff;
                border:1px solid #e4e4e4;
                border-radius: 9vw 0 0 9vw;
                box-sizing: border-box;
            }
        }
        .search_btn{
            width: 18vw;
            height: 9vw;
            text-align: center;
            background: #ff3f13;
            border-radius: 0 9vw 9vw 0;
            .icon_search{
                margin-top: 2.5vw;
                display: inline-block;
                width:4vw;
                height: 4vw;
                background: url('../assets/images/comment_search.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .search_result{
        padding: 0 4vw;
        .search_keyword{
            margin: 3vw 0;
            font-size: 3.5vw;
            color: #666;
        }
        .result_item{
            display: block;
            margin: 4vw 0;
            padding: 3vw;
            border-radius: 2vw;
            background: #fff;
            box-shadow: 0 0 3px 3px rgba(0,0,0,.04);
            .item_content{
                .avatar{
                    display: inline-block;
                    width: 14vw;
                    height: 14vw;
                    border-radius: 100%;
                }
                .content{
                    margin-left: 3vw;
                    .name{
                        font-size: 4vw;
                        color: #333;
                    }
                    .other{
                        margin-top: 1vw;
                        .icon{
                            width: 4.5vw;
                            height: 4.5vw;
                            vertical-align: text-bottom;
                        }
                        .week_num{
                            margin-left: 2vw;
                            font-size: 3.5vw;
                            color:#666;
                            .num{
                                font-size: 4vw;
                                color: #ffa913;
                            }
                        }
                    }
                }
            }
            .item_desc{
                margin-top: 2vw;
                font-size: 12px;
                color: #666;
            }
        }
    }
</style>




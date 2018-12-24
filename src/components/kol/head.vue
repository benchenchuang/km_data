<template>
    <div>
        <skeleton-head v-if="isLoding"></skeleton-head>
        <div class="kol_head" v-else>
            <div class="kol_item kol_info">
                <img class="avatar" v-lazy="info.headImg"/>
                <div class="info_box">
                    <h3 class="name">{{info.nickName}}</h3>
                    <div class="km_about">
                        <p class="index">可梦指数：<span class="num">985</span></p>
                        <a :href="info.shareUrl?'http://'+info.shareUrl:'javascript:void(0);'" class="icon_plat">
                            <img v-if="info.platform=='DOUYIN'" src="../../assets/images/icon_DOUYIN.png"/>
                            <img v-else-if="info.platform=='KUAISHOU'" src="../../assets/images/icon_KUAISHOU.png"/>
                            <img v-else-if="info.platform=='BILIBILI'" src="../../assets/images/icon_BILIBILI.png"/>
                            <img v-else-if="info.platform=='MEIPAI'" src="../../assets/images/icon_MEIPAI.png"/>
                            <img v-else-if="info.platform=='MIAOPAI'" src="../../assets/images/icon_MIAOPAI.png"/>
                            <img v-else-if="info.platform=='XIGUA'" src="../../assets/images/icon_XIGUA.png"/>
                            <img v-else src="../../assets/images/icon_HUOSHAN.png"/>
                        </a>
                        <a href="javascript:void(0);" @click="setShare" class="icon_plat"><img src="../../assets/images/kol_share.png"/></a>
                    </div>
                    <div class="attribute">
                        <span class="area">地域：<span class="val">{{info.city}}</span></span>
                        <span class="gender">性别：<span class="val">{{info.gender | sexFilter}}</span></span>
                    </div>
                    <div class="weibo" v-if="info.weiboName">
                    微博：<img class="icon" src="../../assets/images/icon_weibo.png"/><span class="val">{{info.weiboName}}</span>
                    </div>
                </div>
                <div class="focus">
                    <div class="focus_item on" v-if="info.isFocus" @click="toggleFocus(kolId)"><img class="icon" src="../../assets/images/icon_focus_on.png"/><span class="tip">已关注</span></div>
                    <div class="focus_item" v-else @click="toggleFocus(kolId)"><img class="icon" src="../../assets/images/icon_focus_off.png"/><span class="tip">关注</span></div>
                </div>
            </div>
            <div class="kol_item kol_other">
                <div class="item" v-if="labels.length">
                    <label class="name">标签：</label>
                    <div class="flex_item labels">
                        <span class="label" v-for="(label,index) in labels" :key="index">{{label}}</span>
                    </div>
                </div>
                <div class="item">
                    <label class="name">简介：</label>
                    <div class="flex_item labels">
                        <p class="detail">{{info.signature}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
import skeletonHead from '@/components/skeleton/kol_head';
import {webStorage} from '../../utils/webStorage.js'
export default {
    name:'KolHead',
    components:{
        skeletonHead
    },
    props:['id'],
    data(){
        return{
            isLoding:true,
            kolId:this.id,
            info:'',
            token:'',
            labels:[]
        }
    },
    mounted(){
        let token=webStorage.getLocal('token');
        this.token=token;
        this.getKolInfo(this.id,token);
    },
    methods:{
        toggleFocus(id){
            Axios.controlFocus({kolId:id,token:this.token}).then(res=>{
                if(res.errorCode==200){
                    let infoFocus=this.info.isFocus
                    let tipMsg=infoFocus==1?'关注取消':'已关注'
                    this.info.isFocus=infoFocus==1?0:1;
                    this.$toast.center(tipMsg);
                }else{
                    this.$toast.center(res.errorMsg);
                }
            })
        },
        setShare(){
            this.$emit('setShare');
        },
        getKolInfo(id,token){
            Axios.getKol({kolId:id,token:token}).then(res=>{
                if(res.errorCode==200){
                    this.info=res.data;
                    if(res.data.label){
                        this.labels=res.data.label.split(',');
                    }
                    this.isLoding=false;
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                }
            })
        }
    },
    filters:{
        sexFilter(num){
            if(num==1){
                return '男'
            }else if(num==2){
                return "女"
            }else{
                return '未知'
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .kol_head{
        padding: 0 4vw;
        background: #fff;
        .kol_item{
            position: relative;
            padding: 2vw 0;
            border-bottom: 1px dashed #e4e4e4;
        }
        .kol_info{
            display: flex;
            display: -webkit-flex;
            .val{
                color: #666;
            }
            .avatar{
                width: 15vw;
                height: 15vw;
                border-radius: 100%;
            }
            .info_box{
                margin: 0 16vw 0 2vw;
                font-size: 3.5vw;
                color: #333;
                .name{
                    font-size: 4.5vw;
                }
                .km_about{
                    margin: 1.5vw 0;
                    .index{
                        margin-right: 2vw;
                        display: inline-block;
                        .num{
                            font-size: 5vw;
                            color: #ffa913;
                        }
                    }
                    .icon_plat{
                        margin: 0 1vw;
                        img{
                            display: inline-block;
                            width: 6vw;
                            height: 6vw;
                        }
                    }
                }
                .attribute{
                    margin: 1.5vw 0;
                    .area{
                        margin-right: 4vw;
                    }
                }
                .weibo{
                    .icon{
                        margin: 0 1vw;
                        width: 6vw;
                        height: 6vw;
                        vertical-align: -1.5vw;
                    }
                }
            }
            .focus{
                position: absolute;
                right: -4vw;
                top: 4vw;
                .focus_item{
                    height: 5vw;
                    line-height: 5vw;
                    padding: 2vw 4vw;
                    border-radius: 6vw 0 0 6vw;
                    color: #999;
                    &.on{
                        background: #ffeae5;
                        color: #ff3f13;
                    }
                    .icon{
                        margin-right: 1vw;
                        width: 5vw;
                        vertical-align: middle;
                    }
                }
            }
        }
        .kol_other{
            .item{
                margin: 2vw 0;
                width: 100%;
                display: flex;
                display: -webkit-flex;
                font-size: 3.5vw;
                color: #333;
                .labels{
                    overflow: hidden;
                    .label{
                        float: left;
                        margin-right: 2vw;
                        margin-bottom: 2vw;
                        padding: 3px 4vw;
                        color: #ff3f13;
                        background: #ffeae5;
                        border-radius: 1vw;
                    }
                }
            }
        }
    }
</style>



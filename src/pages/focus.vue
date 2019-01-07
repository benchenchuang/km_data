<template>
    <div>
        <div class="focus_box">
            <div class="focus_head flex_box">
                <p class="name">名称</p>
                <p class="item_index">平台</p>
                <p class="item_index">可梦指数</p>
            </div>
            <div>
                <div class="focus_item">
                    <div class="focus_control" v-if="delCheck">
                        <a class="btn btn_cancel" @click="checkShow" href="javascript:void(0);">取消</a>
                        <a class="btn btn_sure" @click="cancelFocus" href="javascript:void(0);">确定</a>
                    </div>
                    <div class="focus_del">
                        <input type="checkbox" :checked="focusBox.length === checkedNames.length" @click="allChecked" id="all" v-if="delCheck" class="check_box"/>
                        <span class="del_show" v-if="!delCheck" @click="checkShow"><img class="icon" src="../assets/images/icon_focus_pic.png"/><span>取消关注</span></span>
                        <label class="del_show" @click="allChecked" v-else for="all" ><img class="icon" src="../assets/images/icon_focus_pic.png"/><span>全选</span></label>
                    </div>
                </div>
                <div class="focus_item" v-for="(focus,index) in focusBox" :key="index">
                    <div class="flex_box" v-if="delCheck">
                        <div class="name">
                            <input :id="'focus_'+focus.id" type="checkbox" v-model="checkedNames" :value="focus.id" class="check_box"/>
                            <label :for="'focus_'+focus.id">{{focus.nickName}}</label>
                        </div>
                        <p class="item_index">{{focus.platform | platForm}}</p>
                        <p class="item_index">1856</p>
                    </div>
                    <div v-else>
                        <div class="flex_box">
                            <div class="name">
                                <router-link :to="{name:'KolDetail',params:{id:focus.id}}"><label>{{focus.nickName}}</label></router-link>
                            </div>
                            <p class="item_index"><router-link :to="{name:'KolDetail',params:{id:focus.id}}">{{focus.platform | platForm}}</router-link></p>
                            <p class="item_index">
                                <router-link :to="{name:'KolDetail',params:{id:focus.id}}">1856</router-link>
                                <i class="icon_show" @click="showMore(index)"><img src="../assets/images/icon_filter_more.png"/></i>
                            </p>
                        </div>
                        <div class="item_more" v-if="focus.show">
                            <div class="more_item flex_item">
                                <p class="num">{{focus.ninetyCommentCnt | getMillion}}</p>
                                <p class="desc">集均评论数</p>
                            </div>
                            <div class="more_item flex_item">
                                <p class="num">{{focus.ninetyPraiseCnt | getMillion}}</p>
                                <p class="desc">集均点赞数</p>
                            </div>
                            <div class="more_item flex_item">
                                <p class="num">{{focus.ninetyShareCnt | getMillion}}</p>
                                <p class="desc">集均分享数</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <kol-rank v-if="isLoding"></kol-rank>
            <no-data v-if="!focusBox.length && !isLoding" title="暂无关注数据"></no-data>
            
        </div>
        <div class="recommend_box">
            <kol-title title="推荐关注"></kol-title>
            <div class="recommend_list">
                <div class="recommend" v-for="(recommend,index) in recommendBox" :key="index">
                    <img class="avatar" :src="recommend.headImg"/>
                    <div class="item">
                        <h3 class="name">{{recommend.nickName}}</h3>
                        <a href="javascript:void(0);" class="focus_btn" @click="toggleFocus(index,recommend.id)">
                            <p v-if="recommend.isFocus">
                                <img class="icon" src="../assets/images/icon_focus_on.png" /><span class="main_color">已关注</span>
                            </p>
                            <p v-else>
                                <img class="icon" src="../assets/images/icon_focus_off.png" /><span>关注</span>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import KolTitle from '@/components/kol/title.vue'
import KolRank from '@/components/skeleton/rank'
import * as Axios from '../utils/axios.js'
import {webStorage} from '../utils/webStorage.js'
import NoData from '@/components/noData';
export default {
    name:'Focus',
    components:{
        KolTitle,
        NoData,
        KolRank
    },
    data(){
        return{
            delCheck:false,
            token:'',
            focusBox:[],
            checkedNames:[],
            recommendBox:[],
            isCheckAll:false,
            isLoding:true
        }
    },
    watch:{
        checkedNames(res){
            if(res.length==this.focusBox.length){
                this.isCheckAll=true;
            }else{
                this.isCheckAll=false;
            }
        }
    },
    mounted(){
        let token=webStorage.getLocal('token');
        this.token=token;
        this.getFocus(token);
        this.myFocusRecommend(token);
    },
    methods:{
        showMore(index){
            this.focusBox[index].show=!this.focusBox[index].show;
        },
        cancelFocus(){
            let kolArray=this.checkedNames.join(',');
            Axios.delFocus({token:this.token,kolId:kolArray}).then(res=>{
                if(res.errorCode==200){
                    this.$toast.center('取消关注成功');
                    this.delCheck=false;
                    this.myFocusRecommend(this.token);
                }else{
                    this.$toast.center(res.errorMsg); 
                }
                this.getFocus(this.token);
            });
        },
        allChecked(){
            this.isCheckAll=!this.isCheckAll;
            this.checkedNames=[];
            if(this.isCheckAll){
                this.focusBox.forEach(item=>{
                    this.checkedNames.push(item.id);
                })
            }
        },
        checkShow(){
            this.delCheck=!this.delCheck;
            this.checkedNames=[];
        },
        toggleFocus(index,kolId){
            Axios.controlFocus({token:this.token,kolId:kolId}).then(res=>{
                if(res.errorCode==200){
                    let tipMsg=this.recommendBox[index].isFocus==1?'取消关注':'成功关注'
                    this.$toast.center(tipMsg);
                    this.recommendBox[index].isFocus=!this.recommendBox[index].isFocus;
                }
            });
        },
        getFocus(token){
            this.isLoding=true;
            Axios.myFocus({token:token}).then(res=>{
                if(res.errorCode==200){
                    this.focusBox=[];
                    res.data.map(item=>{
                        item.show=false;
                        this.focusBox.push(item);
                    });
                    this.isLoding=false;
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }
            })
        },
        myFocusRecommend(token){
            Axios.myFocusRecommend({token:token,size:6}).then(res=>{
                if(res.errorCode==200){
                    this.recommendBox=res.data;
                }else{
                    this.$toast.center(res.errorMsg);
                }
            })
        }
    },
    filters:{
        platForm(val){
            let name=val.toUpperCase();
            switch(name){
                case 'DOUYIN':
                return '抖音';
                break;
                case 'KUAISHOU':
                return '快手';
                break;
                case 'BILIBILI':
                return 'bilibili';
                break;
                case 'MEIPAI':
                return '美拍';
                break;
                case 'MIAOPAI':
                return '秒拍';
                break;
                case 'XIGUA':
                return '西瓜视频';
                break;
                default:
                return '火山小视频'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.focus_box{
    padding-bottom: 3vw;
    background: #fff;
    .focus_head,
    .focus_item{
        .flex_box{
            padding: 0 4vw;
        }
        line-height: 10vw;
        font-size: 3.5vw;
        color: #666;
        .name{
            flex:2;
            -webkit-flex:2;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .item_index{
            flex:1;
            -webkit-flex:1;
            text-align: center;
        }
        input.check_box{
                margin-right: 1vw;
                position: relative;
                width: 4.5vw;
                height: 4.5vw;
                border:1px solid #e4e4e4;
                vertical-align: -1vw;
                &:checked{
                    border-color: #ff3f13;
                }
                &:checked::before{
                    content: '✓';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    font-size: 3vw;
                    color: #ff3f13;
                    font-weight: 700;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
                }
            }
    }
    .focus_head{
        padding: 0 4vw;
    }
    .del_show{
        display: inline-block;
        font-size: 3.5vw;
        line-height: 10vw;
        color: #ffa913;
        .icon{
            margin: 2.3vw 3px 2.5vw 1vw;
            width: 5vw;
            height: 5vw;
        }
    }
    .focus_del{
        margin-left: 4vw;
    }
    .focus_control{
        float: right;
        margin-right: 4vw;
        margin-top: 2vw;
        .btn{
            float: left;
            margin-left: 3vw;
            width: 12vw;
            height: 6vw;
            line-height: 6vw;
            text-align: center;
            font-size: 3vw;
            color: #666;
            border: 1px solid #e4e4e4;
            border-radius: 1vw;
            box-sizing: border-box;
            &.btn_sure{
                color: #ff3f13;
                border-color: #ff3f13;
            }
        }
    }
    .focus_head{
        font-size: 4vw;
        color: #ff3f13;
        background: #ffeae5;
    }
    .focus_item{
        border-bottom: 1px dashed #e4e4e4;
    }
}
.recommend_box{
    margin-top: 3vw;
    padding: 2vw 0;
    background: #fff;
    .recommend_list{
        overflow: hidden;
        .recommend{
            margin-top: 4vw;
            float: left;
            margin-bottom: 5vw;
            width: 33.3%;
            padding: 0 2vw;
            box-sizing: border-box;
            .avatar{
                float: left;
                width: 12vw;
                height: 12vw;
                border-radius: 100%;
            }
            .item{
                margin-left: 13vw;
                font-size: 3.5vw;
                color: #333;
                .name{
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .focus_btn{
                    font-size: 3vw;
                    .icon{
                        margin-right: 1vw;
                        width:4vw;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
.icon_show img{
    padding: 1vw 2vw;
    width: 3.5vw;
    vertical-align: text-top;
}
.item_more{
    padding: 3vw 4vw 3vw 20%;
    display: flex;
    display: -webkit-flex;
    background: #f8f8f8;
    box-shadow: inset 0 1px 4px  rgba(0,0,0,0.06);
    .more_item{
        flex:1;
        -webkit-flex:1;
        text-align: center;
        font-size: 3.5vw;
        line-height: 1.5;
        .num{
            color: #ff3f13;
        }
        .desc{
            font-size: 12px;
            color: #888;
        }
    }
}
</style>



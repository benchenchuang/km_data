<template>
    <div>
        <div class="focus_box">
            <div class="focus_head flex_box">
                <p class="name">名称</p>
                <p class="item_index">平台</p>
                <p class="item_index">可梦指数</p>
            </div>
            <div v-if="focusBox.length">
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
                <div class="focus_item flex_box" v-for="(focus,index) in focusBox" :key="index">
                    <div class="name">
                        <input :id="'focus_'+focus.id" v-show="delCheck" type="checkbox" v-model="checkedNames" :value="focus.id" class="check_box"/>
                        <label :for="'focus_'+focus.id">{{focus.nickName}}</label>
                    </div>
                    <p class="item_index">{{focus.platform}}</p>
                    <p class="item_index">1856</p>
                </div>
            </div>
            <no-data v-else title="暂无关注数据"></no-data>
            
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
import * as Axios from '../utils/axios.js'
import {webStorage} from '../utils/webStorage.js'
import NoData from '@/components/noData';
export default {
    name:'Focus',
    components:{
        KolTitle,
        NoData
    },
    data(){
        return{
            delCheck:false,
            token:'',
            focusBox:[],
            checkedNames:[],
            recommendBox:[],
            isCheckAll:false
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
        cancelFocus(){
            let kolArray=this.checkedNames.join(',');
            Axios.delFocus({token:this.token,kolId:kolArray}).then(res=>{
                if(res.errorCode==200){
                    this.$toast.center('取消关注成功');
                    this.delCheck=false;
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
            this.checkedNames=[]
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
            Axios.myFocus({token:token}).then(res=>{
                if(res.errorCode==200){
                    this.focusBox=res.data;
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
    }
}
</script>
<style lang="less" scoped>
.focus_box{
    padding-bottom: 3vw;
    background: #fff;
    .focus_head,
    .focus_item{
        height: 10vw;
        line-height: 10vw;
        padding: 0 4vw;
        font-size: 3.5vw;
        color: #666;
        overflow: hidden;
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
    .focus_control{
        float: right;
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
</style>



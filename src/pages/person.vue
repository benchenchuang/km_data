<template>
    <div>
        <div class="person_head">
            <img class="avatar" v-if="info.headImg" v-lazy="baseUrl+info.headImg"/>
            <img class="avatar" v-else src="../assets/images/loading.jpg"/>
            <p class="nick_name">{{info.nickName}}</p>
        </div>

        <div class="person_links">
            <router-link :to="{name:'Focus'}" class="link_item flex_box">
                <img class="link_icon" src="../assets/images/icon_focus.png"/>
                <div class="link_desc">
                    <p class="flex_item">关注红人</p>
                    <img class="icon_more" src="../assets/images/icon_more.png"/>
                </div>
            </router-link>
            <router-link :to="{name:'Home'}" class="link_item flex_box">
                <img class="link_icon" src="../assets/images/icon_tops.png"/>
                <div class="link_desc">
                    <p class="flex_item">红人榜</p>
                    <img class="icon_more" src="../assets/images/icon_more.png"/>
                </div>
            </router-link>
            <router-link :to="{name:'User'}" class="link_item flex_box">
                <img class="link_icon" src="../assets/images/icon_user.png"/>
                <div class="link_desc">
                    <p class="flex_item">个人信息</p>
                    <img class="icon_more" src="../assets/images/icon_more.png"/>
                </div>
            </router-link>
        </div>

        <a class="out_btn" @click="getOut" href="javascript:void(0);"><img class="icon_out" src="../assets/images/icon_out.png"/><span>退出登录</span></a>

    </div>
</template>
<script>
import {webStorage} from '../utils/webStorage.js'
import * as Axios from '../utils/axios.js'
export default {
    name:'Person',
    data(){
        return{
            info:{},
            baseUrl:Axios.imgUrl
        }
    },
    mounted(){
        let token=webStorage.getLocal('token');
        this.getInfo(token);
    },
    methods:{
        getInfo(token){
            Axios.userInfo({token:token}).then(res=>{
                if(res.errorCode==200){
                    this.info=res.data;
                }else{
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },100)
                }
            })
        },
        getOut(){
            webStorage.clearOneLocal('token');
            this.$router.push({name:'Home'})
        }
    }
}
</script>
<style lang="less" scoped>
.person_head{
    padding:4vw 0;
    text-align: center;
    background: #fff;
    .avatar{
        width: 25vw;
        height: 25vw;
        border-radius: 100%;
    }
    .nick_name{
        margin-top: 2vw;
        font-size: 4.5vw;
        color: #333;
    }
}
.person_links{
    margin-top: 4vw;
    background: #fff;
    .link_item{
        padding: 0 4vw;
        .link_icon{
            margin-right: 3vw;
            width: 7vw;
            height: 7vw;
        }
        .link_desc{
            padding: 5vw 0;
            flex:1;
            -webkit-flex:1;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            font-size: 4vw;
            color: #333;
            border-bottom: 1px solid #e4e4e4;
            .icon_more{
                width: 2.3vw;
                height: 4vw;
            }
        }
    }
}
.out_btn{
    display: block;
    margin: 8vw 8vw 0;
    height: 12vw;
    line-height: 12vw;
    text-align: center;
    font-size: 4vw;
    color: #fff;
    background: #ff3f13;
    border-radius: 12vw;
    .icon_out{
        margin-right: 2vw;
        width: 6vw;
        height: 6vw;
        vertical-align: middle;
    }
}
</style>



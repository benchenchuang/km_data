<template>
    <div>
        <div class="login_head">
            <router-link :to="{name:'Home'}"><img class="logo" src="../assets/images/logo.png"/></router-link>
            <div class="login_tab flex_box">
                <a href="javascript:void(0);" class="tab_item flex_item">
                    <p class="name">登 录</p>
                    <i class="arrow_down"></i>
                </a>
            </div>
        </div>
        <div class="login_box">
            <div class="login_item flex_box">
                <img class="label" src="../assets/images/icon_phone.png"/>
                <div class="item_put flex_item">
                    <input type="phone" v-model="formData.phone" placeholder="请输入手机号码"/>
                </div>
            </div>
            <div class="login_item flex_box">
                <img class="label" src="../assets/images/icon_code.png"/>
                <div class="item_put flex_item">
                    <input type="number" v-model="formData.verifyCode" placeholder="请输入图形验证码"/>
                </div>
                <img :src="picCode" class="pic_code" @click="switchCode" />
            </div>
            <div class="login_item flex_box">
                <img class="label" src="../assets/images/icon_email.png"/>
                <div class="item_put flex_item">
                    <input type="number" v-model="formData.code" placeholder="请输入短信验证码"/>
                </div>
                <input type="button" class="get_code" v-if="waits==59" @click="getMsgCode" value="获取验证码">
                <input type="button" class="get_code" v-else disabled :value="waits">
            </div>
            <a href="javascript:void(0);" class="submit_btn" @click="loginByCode">登 录</a>
        </div>
    </div>
</template>
<script>

import * as Axios from '../utils/axios.js'
import {webStorage} from '../utils/webStorage.js'
export default {
    name:'Login',
    data(){
        return{
            fromName:'',
            formData:{
                phone:'',
                verifyCode:'',
                verifyId:'',
                deviceType:0,
                type:3,
                code:''
            },
            waits:59,
            picCode:''
        }
    },
    beforeRouteEnter (to, from, next){
        next(vm => {
            vm.fromName = from.name
        })
    },
    mounted(){
        let token=webStorage.getLocal('token');
        this.getPicCode();
        if(token){
            setTimeout(()=>{
                this.$router.go(-1)
            },100)
        }
    },
    methods:{
        //更换图形验证码
        switchCode(){
            this.getPicCode();
        },
        //获取图形验证码
        getPicCode(){
            Axios.picVerify({w:178,h:64}).then(res=>{
                if(res.errorCode==200){
                    this.picCode=res.data.imgBase64;
                    this.formData.verifyId=res.data.id;
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                }
            })
        },
        //获取短信验证码
        getMsgCode(){
            let formData=this.formData;
            let phone=formData.phone;
            let verifyCode=formData.verifyCode;
            if(!this.isPhone(phone)){
                this.$toast.center('手机号格式不正确');
                return false;
            };
            if(verifyCode.length!==4){
                this.$toast.center('验证码格式不正确');
                return false;
            }
            Axios.getMobileMsg(this.formData).then(res=>{
                if(res.errorCode==200){
                    //暂时弹出验证码
                    // this.$toast.center('已发送，请注意查看');
                    this.$toast.center(res.data.code);
                    this.timeCount();
                }else{
                    this.$toast.center(res.errorMsg);
                }
            })
        },
        //登录
        loginByCode(){
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            Axios.loginByCode(this.formData).then(res=>{
                if(res.errorCode==200){
                    this.$toast.center('登录成功');
                    webStorage.setLocal('token',res.data.token);
                    if(redirect.indexOf('login')>=0){
                        setTimeout(()=>{
                            this.$router.push({
                                path: '/'
                            })
                        },1000)
                    }else{
                        setTimeout(()=>{
                            this.$router.push({
                                path: redirect
                            })
                        },1000)
                    }
                }else{
                    this.$toast.center(res.errorMsg);
                }
            })
        },
        //登录之后跳转
        toLogin(){
            let fromName=this.fromName;
            if(fromName){
                if(fromName.indexOf('Login')==-1 && fromName.indexOf('Register')==-1){
                    this.$router.push({name:fromName})
                }else{
                    this.$router.push({path:'/'})
                }
            }else{
                this.$router.push({path:'/'})
            }
        },
        //验证手机号
        isPhone(num){
            var reg = /^1[3456789]\d{9}$/;
            return reg.test(num);
        },
        //倒计时
        timeCount(){
            var waits=this.waits;
            if(waits==1){
                this.waits=59;
            }else{
                this.waits--;
                setTimeout(()=>{
                    this.timeCount();
                },1000)
            }
        }
    }


}
</script>
<style lang="less" scoped>
.login_head{
    position: relative;
    width: 100%;
    height: 53vw;
    background: url(../assets/images/login_bg.png) no-repeat;
    background-size: 100% 100%;
    .logo{
        padding-top: 10vw;
        display: block;
        margin: 0 auto;
        width:28vw;
        height: 23vw; 
    }
    .login_tab{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        .tab_item{
            text-align: center;
            font-size: 4vw;
            color: #fff;
            .name{
                padding: 1vw 0;
            }
            .arrow_down {
                margin: 0 auto;
                display: -webkit-box;
                width:0; 
                height:0; 
                border-left:2vw solid transparent;
                border-right:2vw solid transparent;
                border-bottom:2vw solid #fff;
            }
        }
    }
}
.login_box{
    padding: 4vw 14vw;
    background: #fff;
    .login_item{
        padding: 5vw 0 3vw;
        border-bottom: 1px solid #e4e4e4;
        .label{
            margin: 0 2vw;
            width: 4.5vw;
        }
        .item_put{
            input{
                display: block;
                width: 100%;
                font-size: 4vw;
                height: 8vw;
                line-height: 8vw;
            }
        }
        .pic_code{
            width: 25vw;
        }
        .get_code{
            width: 20vw;
            height: 8vw;
            line-height: 8vw;
            text-align: center;
            font-size: 3.5vw;
            color: #ff3f13;
            background: #ffeae5;
            border-radius: 1vw;
        }
    }
    .submit_btn{
        margin: 12vw 0 6vw;
        display: block;
        width: 100%;
        height: 11vw;
        line-height: 11vw;
        text-align: center;
        font-size: 4vw;
        color: #fff;
        background: #ff3f13;
        border-radius: 11vw;
    }
}
</style>



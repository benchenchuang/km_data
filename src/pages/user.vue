<template>
    <div>
        <div class="info_box">
            <div class="info_item flex_box">
                <label class="name">用户昵称</label>
                <div class="item_put">
                    <input type="text" v-model="info.nickName" placeholder="请输入昵称">
                </div>
            </div>
            <div class="info_item flex_box">
                <label class="name">公司名称</label>
                <div class="item_put">
                    <input type="text" v-model="info.firmName" placeholder="请输入公司昵称">
                </div>
            </div>
            <div class="info_item flex_box">
                <label class="name">微信号</label>
                <div class="item_put">
                    <input type="text" v-model="info.wxCode" placeholder="请输入微信号">
                </div>
            </div>
        </div>
        <a class="save_btn" @click="getSave" href="javascript:void(0);">保 存</a>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
import {webStorage} from '../utils/webStorage.js'
export default {
    name:'User',
    data(){
        return{
            token:'',
            info:{}
        }
    },
    mounted(){
        let token=webStorage.getLocal('token');
        this.info.token=token;
        this.getInfo(token);
    },
    methods:{
        getInfo(token){
            Axios.userInfo({token:token}).then(res=>{
                if(res.errorCode==200){
                    this.info=res.data;
                    if(!this.info.nickName){
                        this.info.nickName='用户_'+this.info.account.substring(7);
                    }
                }else{
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },100)
                }
            })
        },
        getSave(){
            if(this.info.nickName){
                Axios.editUser(this.info).then(res=>{
                    if(res.errorCode==200){
                        this.$toast.center('修改成功！');
                    }else{
                        this.$toast.center(res.errorMsg);
                    }
                })
            }else{
                this.$toast.center('用户昵称不能为空！');
            }
        }
    }
}
</script>
<style lang="less" scoped>
.info_box{
    padding: 2vw 4vw 0;
    background: #fff;
    .info_item{
        padding: 4vw 0;
        border-bottom: 1px solid #e4e4e4;
        .name{
            font-size: 3.5vw;
            color: #333;
        }
        .item_put{
            flex:1;
            -webkit-flex:1;
            margin-left: 2vw;
            input{
                display: block;
                width: 100%;
                height: 8vw;
                line-height: 8vw;
                text-align: right;
                font-size: 3.5vw;
            }
        }
    }
}

.save_btn{
    display: block;
    margin: 8vw 8vw 0;
    height: 12vw;
    line-height: 12vw;
    text-align: center;
    font-size: 4vw;
    color: #fff;
    background: #ff3f13;
    border-radius: 12vw;
}
</style>



<template>
    <div>
        <div class="over_view">
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_praise.png"/>
                <p class="num">{{data.nintyCommentAveCnt | getMillion}}</p>
                <p class="name">集均评论数</p>
            </div>
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_like.png"/>
                <p class="num">{{data.nintyPraiseAveCnt | getMillion}}</p>
                <p class="name">集均点赞数</p>
            </div>
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_joy.png"/>
                <p class="num">{{data.nintyShareAveCnt | getMillion}}</p>
                <p class="name">集均分享数</p>
            </div>
        </div>
        <div class="over_view">
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_fans.png"/>
                <p class="num">{{data.followCnt | getMillion}}</p>
                <p class="name">粉丝总数</p>
            </div>
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_fans_add.png"/>
                <p class="num">{{data.thiryFollowAddCnt | getMillion}}</p>
                <p class="name">30天粉丝增量</p>
            </div>
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_dv.png"/>
                <p class="num">{{data.nintyVideoCnt | getMillion}}</p>
                <p class="name">90天发布视频</p>
            </div>
            <div class="flex_item">
                <img class="icon" src="../../assets/images/icon_rate.png"/>
                <p class="num">{{data.nintyVideoCnt | videoRate}}/周</p>
                <p class="name">视频发布频率</p>
            </div>
        </div>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
export default {
    name:"OverView",
    props:['id'],
    data(){
        return{
            data:{}
        }
    },
    mounted(){
        this.getKolData(this.id);
    },
    methods:{
        getKolData(id){
            Axios.getKolData({kolId:id}).then(res=>{
                if(res.errorCode==200){
                    this.data=res.data;
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
        videoRate(num){
            return (num/12).toFixed(1)
        }
    }
}
</script>
<style lang="less" scoped>  
    .over_view{
        padding: 3vw 0;
        margin: 0 4vw;
        border-bottom: 1px dashed #e4e4e4;
        display: flex;
        display: -webkit-flex;
        text-align: center;
        .icon{
            width: 6vw;
        }
        .num{
            margin-top: 2vw;
            font-size: 4vw;
            color: #333;
        }
        .name{
            font-size: 12px;
            color:#666;
        }
        &:last-child{
            border-bottom: none;
        }
    }
</style>



<template>
    <div class="canvas_head">
        <div class="head_tops">
            <div class="top_item small_top" v-if="rank.sort==2" v-for="(rank,index) in data" :key="index">
                <img class="top" src="../../assets/images/rank_02.png">
                <img class="avatar" :src="rank.headImg">
                <p class="nick_name">{{rank.nickName}}</p>
            </div>
            <div class="top_item first_top" v-if="rank.sort==1" v-for="(rank,index) in data" :key="index">
                <img class="top" src="../../assets/images/rank_01.png">
                <img class="avatar" :src="rank.headImg">
                <p class="nick_name">{{rank.nickName}}</p>
            </div>
            <div class="top_item small_top" v-if="rank.sort==3" v-for="(rank,index) in data" :key="index">
                <img class="top" src="../../assets/images/rank_03.png">
                <img class="avatar" :src="rank.headImg">
                <p class="nick_name">{{rank.nickName}}</p>
            </div>
        </div>
        <div class="head_title">
            <p class="rank_no">排名</p>
            <p class="rank_name">名称</p>
            <p class="rank_num">粉丝总数</p>
            <p class="rank_num">可梦指数</p>
        </div>
        <img src="../../assets/images/ranks_topic.png" class="canvas_head_bg">
    </div>
</template>
<script>
export default {
    name:"CanvasHead",
    props:['ranks'],
    data(){
        return{
            data:this.ranks
        }
    }
}
</script>
<style lang="less" scoped>
.canvas_head{
    position: relative;
    width: 100%;
    height: 68vw;
    overflow: hidden;
    .canvas_head_bg{
        position: absolute;
        width: 100%;
        left: 0;
        top:0;
        height: 68vw;
        z-index: 0;
    }
    .head_tops{
        position: relative;
        z-index: 1;
        padding: 17vw 4vw 2vw;
        height: 40.5vw;
        display: flex;
        display: -webkit-flex;
        align-items: flex-end;
        .top_item{
            flex: 1;
            -webkit-flex:1;
            margin-top: 4vw;
            padding-bottom: 2vw;
            height: 34vw;
            text-align: center;
            font-size: 4vw;
            color: #333;
            background: #fff;
            &:first-child{
                border-radius: 2vw 0 0 2vw;
            }
            &:last-child{
                border-radius:  0 2vw 2vw 0;
            }
            .top{
                display: block;
                margin: 0 auto;
                width: 4.5vw;
            }
            .avatar{
                display: block;
                margin: 4vw auto;
                width: 12vw;
                height: 12vw;
                border-radius: 100%;
                border-radius: 1px solid #ff3f13;
            }
            .nick_name{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            &.first_top{
                height: 39vw;
                border-radius:  2vw 2vw 0 0;
                margin: 0 1px;
                flex:1.5;
                -webkit-flex:1.5;
                .top{
                    width: 6vw;
                }
                .avatar{
                    width: 15vw;
                    height: 15vw;
                }
                .nick_name{
                    color: #ff3f13;
                }
            }
        }
    }
    .head_title{
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        text-align: center;
        font-size: 4vw;
        color: #fff;
        .rank_no{
            flex:1;
            -webkit-flex:1;
        }
        .rank_name{
            flex:2.5;
            -webkit-flex:2.5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .rank_num{
            flex:1.5;
            -webkit-flex:1.5;
        }
    }
}
</style>



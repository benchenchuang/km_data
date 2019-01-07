<template>
    <div class="ranks_box">
        <div class="ranks_table">
            <div class="table_head rank_item" v-if="head">
                <p class="rank_no">排名</p>
                <p class="rank_name">名称</p>
                <p class="rank_num">粉丝总数</p>
                <p class="rank_num">可梦指数</p>
            </div>
            <div class="table_content">
                <div class="rank_block" v-for="(item,index) in data" :key="index">
                    <div class="rank_item">
                        <router-link :to="{name:'KolDetail',params:{id:item.kolId}}" class="rank_no">
                            <img class="rank" v-if="index==0" src="../../assets/images/rank_01.png">
                            <img class="rank" v-else-if="index==1" src="../../assets/images/rank_02.png">
                            <img class="rank" v-else-if="index==2" src="../../assets/images/rank_03.png">
                            <span class="num" v-else>{{index+1}}</span>
                        </router-link>
                        <router-link :to="{name:'KolDetail',params:{id:item.kolId}}" class="rank_name">{{item.nickName}}</router-link>
                        <router-link :to="{name:'KolDetail',params:{id:item.kolId}}" class="rank_num">{{item.followCnt | getMillion}}</router-link>
                        <p class="rank_num">
                            <router-link :to="{name:'KolDetail',params:{id:item.kolId}}" class="rank_num">1856</router-link>
                            <i class="icon_show" @click="showMore(index)"><img src="../../assets/images/icon_filter_more.png"/></i>
                        </p>
                    </div>
                    <div class="item_more" v-if="item.show">
                        <div class="more_item flex_item">
                            <p class="num">{{item.videoAveCnt | getMillion}}</p>
                            <p class="desc">集均评论数</p>
                        </div>
                        <div class="more_item flex_item">
                            <p class="num">{{item.praiseAveCnt | getMillion}}</p>
                            <p class="desc">集均点赞数</p>
                        </div>
                        <div class="more_item flex_item">
                            <p class="num">{{item.shareAveCnt | getMillion}}</p>
                            <p class="desc">集均分享数</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'RankList',
    props:['data','head'],
    data(){
        return{
            ranks:[]
        }
    },
    methods:{
        showMore(index){
            this.data[index].show=!this.data[index].show;
        }
    }
}
</script>
<style lang="less" scoped>
.ranks_table{
    width: 100%;
    .table_head{
        height: 10vw;
        font-size: 4vw;
        background: #ffeae5;
        &.rank_item{
            color: #ff3f13;
            padding: 0;
            border-bottom: none;
        }
    }
    .rank_item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        text-align: center;
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
            .icon_show img{
                padding: 1vw 2vw;
                width: 3.5vw;
                vertical-align: text-top;
            }
        }
    }
    .table_content{
        background: #fff;
    }
    .rank_block{
        border-bottom: 1px dashed #e4e4e4;
    }
    .rank_item{
        padding: 2vw 0;
        font-size: 3.6vw;
        color: #666;
        .rank{
            width: 5vw;
            height: 8vw;
        }
        .num{
            margin: 0 auto;
            display: block;
            width: 7vw;
            height: 7vw;
            text-align: center;
            line-height: 7vw;
            color: #333;
            border:1px solid #e4e4e4;
            border-radius: 100%;
        }
    }
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



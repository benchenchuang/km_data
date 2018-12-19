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
                <router-link :to="{name:'KolDetail',params:{id:item.kolId}}" class="rank_item" v-for="(item,index) in data" :key="index">
                    <p class="rank_no">
                        <img class="rank" v-if="item.sort==1" src="../../assets/images/rank_01.png">
                        <img class="rank" v-else-if="item.sort==2" src="../../assets/images/rank_02.png">
                        <img class="rank" v-else-if="item.sort==3" src="../../assets/images/rank_03.png">
                        <span class="num" v-else>{{item.sort}}</span>
                    </p>
                    <p class="rank_name">{{item.nickName}}</p>
                    <p class="rank_num">{{item.followCnt | getMillion}}</p>
                    <p class="rank_num">1856</p>
                </router-link>
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
    filters:{
        getMillion(num){
            if(num>=10000){
                return (num/10000).toFixed(2)+'万'
            }
            return num;
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
        }
    }
    .table_content{
        background: #fff;
    }
    .rank_item{
        padding: 2vw 0;
        font-size: 3.6vw;
        color: #666;
        border-bottom: 1px dashed #e4e4e4;
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
</style>



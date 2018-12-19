<template>
    <div>
        <a href="javascript:void(0);" class="rank_item" v-for="(item,index) in 6" :key="index">
            <p class="rank_no">
                <span class="rank"></span>
            </p>
            <p class="rank_name"></p>
            <p class="rank_num"></p>
            <p class="rank_num"></p>
        </a>
    </div>
</template>
<script>
export default {
    name:'RankGuide'
}
</script>
<style lang="less" scoped>
    .rank_item{
        padding: 3vw 0;
        border-bottom: 1px dashed #f4f4f4;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        text-align: center;
        .rank_no{
            flex:1;
            -webkit-flex:1;
            .rank{
                margin: 0 auto;
                display: block;
                width: 8vw;
                height: 8vw;
                line-height: 8vw;
                border-radius: 100%;
                background: #f4f4f4;
            }
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
        .rank_name,
        .rank_num{
            margin: 0 1vw;
            width: 100%;
            height: 4vw;
            background: #f4f4f4;
        }
    }
</style>



<template>
    <div class="no_data">
        <img :src="imgUrl">
        <p class="txt">暂无数据</p>
    </div>
</template>
<script>
export default {
    name:'NoData',
    props:['title'],
    data(){
        return{
            imgUrl:require("../assets/images/no_data.png")
        }
    },
}
</script>
<style lang="less" scoped>
    .no_data{
        width: 60vw;
        margin: 4vw auto;
        font-size: 4vw;
        text-align: center;
        image{
            max-width:30vw;
        }
        .txt{
            color: #999;
        }
    }
</style>


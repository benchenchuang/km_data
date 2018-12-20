<template>
    <div class="no_data">
        <img src="../assets/images/no_data.png">
        <p class="txt">{{title?title:'暂无数据'}}</p>
    </div>
</template>
<script>
export default {
    name:'NoData',
    props:['title']
}
</script>
<style lang="less" scoped>
    .no_data{
        width: 60vw;
        margin: 4vw auto;
        font-size: 3.5vw;
        text-align: center;
        img{
            max-width:40vw;
        }
        .txt{
            color: #999;
        }
    }
</style>


<template>
    <div class="no_data">
        <img src="../../static/images/no_data.png">
        <p class="txt">暂无数据</p>
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


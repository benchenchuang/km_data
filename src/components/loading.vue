<template>
    <div class="loading">
        <img class="bar" :src="imgUrl"/>
        <p class="txt">- - {{text}} - -</p>
    </div>
</template>
<script>
export default {
    name:'Loding',
    props:['text'],
    data(){
        return{
            imgUrl:require("../assets/svg-loaders/bars.svg")
        }
    }
}
</script>

<style lang="less" scoped>
    .loading{
        text-align: center;
        .bar{
            width: 14vw;
            margin: 4vw 0;
        }
        .txt{
            font-size: 3.5vw;
            color: #999;
        }
    }
</style>


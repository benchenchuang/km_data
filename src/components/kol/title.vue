<template>
    <div class="kol_title">
        <h3 class="title">{{title}}</h3>
        <img class="title_bg" src="../../assets/images/kol_title.png"/>
    </div>
</template>
<script>
export default {
    name:"KolTitle",
    props:['title']
}
</script>
<style lang="less" scoped>
    .kol_title{
        position: relative;
        margin:3vw auto;
        width: 38vw;
        height: 7vw;
        line-height: 5.5vw;
        font-size: 3.5vw;
        color: #fff;
        text-align: center;
        .title{
            position: relative;
            z-index:1;
        }
        .title_bg{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 100%;
        }
    }
</style>



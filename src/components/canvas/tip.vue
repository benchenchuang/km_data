<template>
    <div class="tip_box">
        <img class="icon" src="../../assets/images/icon_tip.png"/><span>已生成报告，</span><span class="red">长按可保存图片或者分享好友</span>
    </div>
</template>
<script>
export default {
    name:'CanvasTip'
}
</script>
<style lang="less" scoped>
    .tip_box{
        padding: 3vw 0;
        text-align: center;
        font-size: 3.5vw;
        color: #333;
        background: #ffe3e3;
        .icon{
            margin-right: 1vw;
            width: 5vw;
            height: 5vw;
        }
        .red{
            color: #ff3f13;
        }
    }
</style>



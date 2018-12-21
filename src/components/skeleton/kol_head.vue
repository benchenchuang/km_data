<template>
    <div class="skeleton_head">
        <div class="head_box">
            <div class="avatar"></div>
            <div class="flex_item">
                <h3 class="name"></h3>
                <p class="desc"></p>
                <p class="desc"></p>
                <p class="desc"></p>
            </div>
        </div>
        <div class="head_box">
            <p class="desc"></p>
        </div>
    </div>
</template>
<script>
export default {
    name:'skeletonKol'
}
</script>
<style lang="less" scoped>
@grey_bg:#f4f4f4;
.skeleton_head{
    padding: 0 4vw;
    background: #fff;
    .head_box{
        padding: 4vw 0;
        display: flex;
        display: -webkit-flex;
        border-bottom: 1px dashed #e4e4e4;
    }
    .avatar{
        margin-right: 3vw;
        width: 15vw;
        height: 15vw;
        border-radius: 100%;
        background: @grey_bg;
    }
    .name{
        margin-bottom: 3vw;
        width: 100%;
        height: 4vw;
        background: @grey_bg;
        vertical-align: top;
    }
    .desc{
        margin-top: 2vw;
        width: 100%;
        height: 2.5vw;
        background: @grey_bg;
    }
}
</style>



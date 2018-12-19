<template>
    <div>
        <div class="home_header main_bg flex_box">
            <img @click="headShare" class="icon_pic" src="../../assets/images/icon_share.png"/>
            <router-link :to="{name:'Search'}" class="search_item flex_item">
                <i class="icon_search"></i><span>请输入红人名称</span>
            </router-link>
            <router-link :to="{name:'Person'}" class="icon_pic">
                <img src="../../assets/images/icon_person.png"/>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"HomeHeader",
    methods:{
        headShare(){
            this.$emit('headShare');
        }
    }
}
</script>
<style lang="less" scoped>
    .home_header{
        padding: 2vw 4vw;
        .icon_pic,
        .icon_pic img{
            width: 8vw;
            height: 8vw;
            margin: 0 2vw;
        }
        .search_item{
            margin: 0 2vw;
            background: #fff;
            height: 8vw;
            line-height: 8vw;
            border-radius: 8vw;
            text-align: center;
            font-size: 3.5vw;
            color: #bbb;
            .icon_search{
                margin-right: 1vw;
                display: inline-block;
                width:4vw;
                height: 4vw;
                background: url('../../assets/images/icon_search.png') no-repeat;
                background-size: 100% 100%;
                vertical-align: -1vw;
            }
        }
    }
</style>


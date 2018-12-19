<template>
    <div class="kol_tabs flex_box">
        <div class="flex_item tab_item" :class="{'active':thisIndex==1}" @click="switchTab(1)">
            <img class="tab_icon" v-if="thisIndex==1" src="../../assets/images/icon_analysis_on.png">
            <img class="tab_icon" v-else src="../../assets/images/icon_analysis_off.png">
            <span class="name">数据分析</span>
        </div>
        <div class="flex_item tab_item" :class="{'active':thisIndex==2}" @click="switchTab(2)">
            <img class="tab_icon" v-if="thisIndex==2" src="../../assets/images/icon_public_on.png">
            <img class="tab_icon" v-else src="../../assets/images/icon_public_off.png">
            <span class="name">舆情分析</span>
        </div>
        <div class="flex_item tab_item" :class="{'active':thisIndex==3}" @click="switchTab(3)">
            <img class="tab_icon" v-if="thisIndex==3" src="../../assets/images/icon_portrait_on.png">
            <img class="tab_icon" v-else src="../../assets/images/icon_portrait_off.png">
            <span class="name">用户画像</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'KolTab',
    data(){
        return{
            thisIndex:1,
        }
    },
    methods:{
        switchTab(index){
            this.thisIndex=index;
            this.$emit('getActive',index)
        }
    }

}
</script>
<style lang="less" scoped>
    .kol_tabs{
        padding: 3vw 0;
        background: #f8f8f8;
        .tab_item{
            text-align: center;
            font-size: 3.5vw;
            color: #666;
            height: 7vw;
            &.active{
                .name{
                    color: #ff3f13;
                }
            }
            .tab_icon{
                margin-right: .5vw;
                width: 7vw;
                height: 7vw;
                vertical-align:-2vw;
            }
        }
    }
</style>


<template>
    <div class="no_data">
        <img src="../assets/images/no_data.png">
        <p class="txt">好尴尬呀...{{name}}跑丢了... {{time}}秒之后</p>
        <a class="back_btn" href="./">返回首页</a>
    </div>
</template>
<script>
export default {
    name:'Error',
    props:['title'],
    data(){
        return{
            time:6,
            timer:null,
            name:this.title || '页面'
        }
    },
    mounted(){
        this.timeCount();
    },
    methods:{
        timeCount(){
            clearInterval(this.timer);
            this.time--;
            if(this.time<=0){
                this.$router.push({path:'/'})
            }else{
                this.timer=setInterval(()=>{
                    this.timeCount();
                },1000)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .no_data{
        width: 60vw;
        margin: 20vw auto 0;
        font-size: 4vw;
        text-align: center;
        image{
            max-width:30vw;
        }
        .txt{
            color: #999;
        }
        .back_btn{
            color: #ff3f13;
        }
    }
</style>


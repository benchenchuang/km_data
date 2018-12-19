<template>
    <div class="comments_wrap">
        <div class="comment_head flex_box">
            <input class="flex_item comment_put" v-model="keyWord" type="search" placeholder="输入关键词"/>
            <a class="comment_btn" href="javascript:void(0);" @click="searchComment"><img class="icon_search" src="../../assets/images/comment_search.png"/></a>
        </div>
        <div class="comment_box">
            <ul>
                <li class="comment" v-for="(comment,index) in comments" :key="index">
                    <p class="time">{{comment.createTime}}</p>
                    <p class="text">{{comment.content}}</p>
                </li>
            </ul>
        </div>
         <ul class="pagination flex_box" v-if="comments.length">
            <li :class="{'disabled': current == 1}" @click="setCurrent(current - 1)">‹</li>
            <li :class="{'disabled': current == maxPage}" @click="setCurrent(current + 1)">›</li>
        </ul>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
export default {
    name:'KolComments',
    props:['id'],
    data(){
        return{
            current:1,
            maxPage:1,
            limit:10,
            keyWord:'',
            allComments:[],
            comments:[]
        }
    },
    created(){
        
    },
    mounted(){
        this.$root.Bus.$on('wordCloud',val=>{
            this.keyWord=val;
            this.getComments(val);
        })
    },
    methods:{
        searchComment(){
            this.getComments(this.keyWord);
        },
        getComments(keyword){
            this.current=1;
            Axios.comments({kolId:this.id,keyword:keyword}).then(res=>{
                if(res.errorCode==200){
                    this.maxPage=Math.ceil(res.data.length/this.limit);
                    this.allComments=res.data;
                    this.comments=this.allComments.slice(0,this.limit);
                }else{
                    this.$toast.center(res.errorMsg);
                }
            })
        },
        setCurrent(page){
            if(page<1){
              this.current=1;
              return false;
            }
            if(page>this.maxPage){
                this.current=this.maxPage;
                return false;
            }
            this.current=page;
            this.comments=this.allComments.slice((page-1)*this.limit,page*this.limit);
        }
    }
}
</script>
<style lang="less" scoped>
    .comment_head{
        padding: 2vw 8vw;
        .comment_put{
            flex:1;
            -webkit-flex:1;
            padding: 1vw 4vw;
            height: 8vw;
            line-height: 8vw;
            background: #f8f8f8;
            border-radius: 8vw 0 0 8vw;
            box-sizing: border-box;
        }
        .comment_btn{
            width: 14vw;
            height: 8vw;
            text-align: center;
            background: #ff3f13;
            border-radius: 0 8vw 8vw 0;
            .icon_search{
                width: 5vw;
                height: 5vw;
                padding-top: 1.5vw;
            }
        }
    }
    .comment_box{
        padding: 0 4vw;
        .comment{
            padding: 2vw 0;
            border-bottom: 1px dashed #e4e4e4;
            font-size: 3.5vw;
            .time{
                color: #333;
            }
            .text{
                color: #666;
            }
        }
    }
    .pagination{
        margin: 2vw auto;
        width: 32vw;
        text-align: center;
        li{
            margin: 0 4vw;
            width: 8vw;
            height: 8vw;
            line-height: 7.5vw;
            text-align: center;
            font-size: 5vw;
            color: #ff3f13;
            background: #ffeae5;
            border-radius: 100vw;
            &.disabled{
                color:#b5b5b5;
                background: #f1f1f1;
            }
        }
    }
</style>



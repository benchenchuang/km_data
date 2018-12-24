<template>
    <div class="video_box flex_box">
        <a class="video_item flex_item" :href="video.videoShareUrl" v-for="(video,index) in data" :key="index">
            <div class="video_cover">
                <img class="play" src="../../assets/images/video_play.png"/>
                <img class="cover" v-lazy="video.videoCoverUrl"/>
            </div>
            <div class="video_info">
                <h3 class="title">{{video.videoInfo}}</h3>
                <div class="video_other">
                    <div class="other_item">
                        <img class="icon" src="../../assets/images/video_comment.png"/>
                        <span class="txt">{{video.commentCnt | getMillion}}</span>
                    </div>
                    <div class="other_item fr">
                        <img class="icon" src="../../assets/images/video_like.png"/>
                        <span class="txt">{{video.praiseCnt | getMillion}}</span>
                    </div>
                </div>
            </div>
        </a>
        <no-data v-if="!data.length"></no-data>
    </div>
</template>
<script>
import * as Axios from '../../utils/axios.js'
import NoData from '../noData'
export default {
    name:'kolVideo',
    components:{NoData},
    props:['id','type'],
    data(){
        return{
            data:[]
        }
    },
    mounted(){
        this.kolVideos(this.id,this.type)
    },
    methods:{
        kolVideos(id,type){
            Axios.kolVideos({kolId:id,page:1,limit:2,type:type}).then(res=>{
                if(res.errorCode==200){
                    this.data=res.data.videos;
                }else{
                    this.$toast.center(res.errorMsg);
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
.video_box{
    padding: 2vw;
    .video_item{
        width: 50%;
        margin: 0 2vw;
        .video_cover{
            position: relative;
            width: 100%;
            .cover{
                width: 100%;
                height: 52vw;
            }
            .play{
                position: absolute;
                right: 1vw;
                bottom: 1vw;
                width: 10vw;
                height: 10vw;
            }
        }
        .video_info{
            margin-top: 1vw;
            .title{
                height: 12vw;
                font-size: 3.8vw;
                color: #666;
                overflow:hidden; 
                text-overflow:ellipsis;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2; 
            }
            .video_other{
                margin-top: 1vw;
                overflow: hidden;
                .other_item{
                    float: left;
                    height: 4vw;
                    line-height: 4vw;
                    .icon{
                        width: 5vw;
                        height: 4vw;
                        vertical-align: -3px;
                    }
                    .txt{
                        color: #666;
                    }
                    &.fr{
                        float: right;
                    }
                }
            }
        }
    }
}
</style>


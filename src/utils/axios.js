import axios from 'axios';
import Qs from 'qs'
const api='http://116.62.161.77:8051/api';
export const imgUrl='http://116.62.161.77:8051/api/common/download/';
import router from '../router/index'
import {webStorage} from './webStorage'
//发送拦截
axios.interceptors.request.use(
    config=>{
        config.data=Qs.stringify(config.data)
        let token=webStorage.getLocal('token') || '';
        if(token){
            config.headers.Authorization=token;
        }
        config.data+='&token='+token;
        return config;
    },err=>{
        return Promise.reject(err);
    }
);
//接收拦截
axios.interceptors.response.use(
    response=>{
        if(response.data.errorCode==102){
            // 清除token
            webStorage.clearOneLocal('token');
            setTimeout(() => {   
                router.replace({    
                    path: '/login',    
                    query: { 
                    redirect: router.currentRoute.fullPath 
                    }   
                });   
            }, 1000); 
        }
        return response;
    },
    error=>{
        if(error.response){
            switch(error.response.errorCode){
                case 401:
                router.replace({
                    path:"/login",
                    query:{
                        redirect:router.currentRoute.fullpath
                    }
                });
                break;
                case 102:
                // 清除token
                setTimeout(() => {   
                    router.replace({    
                        path: '/login',    
                        query: { 
                        redirect: router.currentRoute.fullPath 
                        }   
                    });   
                }, 1000);   
                break;
                // 其他错误
                default:
                break;
            }
        }
        return Promise.reject(error.response.data)
    }
)

//每周红人榜
export const hotUser=(params)=>{return axios.post(api+'/index/dayHotUser',params).then(res=>res.data)};
//密码登录
export const loginByPwd=(params)=>{return axios.post(api+'/account/loginByPwd',params).then(res=>res.data)};
//短信登录
export const loginByCode=(params)=>{return axios.post(api+'/account/loginByCode',params).then(res=>res.data)};
//注册
export const postRegist=(params)=>{return axios.post(api+'/account/regist',params).then(res=>res.data)};
//验证码
export const picVerify=(params)=>{return axios.post(api+'/account/picVerify',params).then(res=>res.data)};
//个人资料
export const userInfo=(params)=>{return axios.post(api+'/account/userInfo',params).then(res=>res.data)};
//获取验证码
export const getMobileMsg=(params)=>{return axios.post(api+'/account/getMobileMsg',params).then(res=>res.data)};
//完善个人资料
export const editUser=(params)=>{return axios.post(api+'/account/editUser',params).then(res=>res.data)};
//我的关注
export const myFocus=(params)=>{return axios.post(api+'/kol/myFocus',params).then(res=>res.data)};
//关注/取消关注
export const controlFocus=(params)=>{return axios.post(api+'/kol/focus',params).then(res=>res.data)};
//取消关注
export const delFocus=(params)=>{return axios.post(api+'/kol/delFocus',params).then(res=>res.data)};
//推荐关注
export const myFocusRecommend=(params)=>{return axios.post(api+'/kol/myFocusRecommend',params).then(res=>res.data)};
//平台标签
export const getLabel=(params)=>{return axios.post(api+'/kol/getLabel',params).then(res=>res.data)};

//平台列表
export const platforms=(params)=>{return axios.post(api+'/index/platforms',params).then(res=>res.data)};
//每周红人榜
export const dayHotUser=(params)=>{return axios.post(api+'/index/dayHotUser',params).then(res=>res.data)};
//kol搜索
export const search=(params)=>{return axios.post(api+'/kol/search',params).then(res=>res.data)};


/**
 * 网红详情
 */
//基本信息
export const getKol=(params)=>{return axios.post(api+'/index/getKol',params).then(res=>res.data)};
//数据分析
export const getKolData=(params)=>{return axios.post(api+'/index/getKolData',params).then(res=>res.data)};
//数据趋势
export const getKolFollowData=(params)=>{return axios.post(api+'/index/getKolFollowData',params).then(res=>res.data)};
//用户视频
export const kolVideos=(params)=>{return axios.post(api+'/index/kolVideos',params).then(res=>res.data)};
//舆情分析
export const queryCommentKey=(params)=>{return axios.post(api+'/kol/queryCommentKey',params).then(res=>res.data)};
//评价
export const comments=(params)=>{return axios.post(api+'/kol/comments',params).then(res=>res.data)};
//用户画像
export const getFollower=(params)=>{return axios.post(api+'/index/getFollower',params).then(res=>res.data)};



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import {webStorage} from './utils/webStorage';
require('./assets/toast/toast.css')
import Toast from './assets/toast/toast';
import infiniteScroll from 'vue-infinite-scroll'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.config.productionTip = false

FastClick.attach(document.body)
Vue.prototype.webStorage=webStorage;
Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  error: require('./assets/images/error.jpg'),
  loading: require('./assets/images/loading.jpg'),
  attempt: 1
})
Vue.use(Toast);
Vue.use(infiniteScroll);

router.beforeEach((to,from,next)=>{
  let token=webStorage.getLocal('token') || '';
  if(!token){
    if(to.meta.certify){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  }
  if(to.meta.title){
    document.title=to.meta.title;
  }
  next();
});

Vue.filter('getMillion',num=>{
  if(num>=10000){
      return (num/10000).toFixed(1)+'万'
  }
  return num;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    Bus:new Vue()
  },
  components: { App },
  template: '<App/>'
})

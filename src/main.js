//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
// 自己写的样式放在后面 防止被覆盖
import './statics/site/css/style.css'
//导入根组件
//es5  var App = require('./App.vue')
import App from './App'
// 商品列表页轮播图
Vue.use(ElementUI);
// 商品列表页懒加载
Vue.use(VueLazyload);
// 修改时间格式
Vue.filter('dateFmt', (input, dateFmtString = "YYYY-MM-DD") => {
    return moment(input).format(dateFmtString);
})

import router from './router/'
import store from './store/store.js'

new Vue({
    el: "#app",
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render: h => h(App)
})
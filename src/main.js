//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'

Vue.use(VueRouter)
Vue.use(ElementUI)

import 'element-ui/lib/theme-chalk/index.css'
import './statics/site/css/style.css'

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'
import layout from './components/layout.vue'
import goodslist from './components/good/goodslist.vue'


// 给vue原型添加一个$axios的方法
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://39.108.135.214:8899/"
    // 修改时间格式
Vue.filter('dateFmt', (input, dateFmtString = "YYYY-MM-DD") => {
    return moment(input).format(dateFmtString);
})



const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/site/goodslist' },
        {
            path: '/site',
            component: layout,
            children: [
                { path: 'goodslist', component: goodslist }
            ]
        }
    ]
})

new Vue({
    el: "#app",
    router,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render: h => h(App)
})
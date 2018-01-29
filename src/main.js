//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
// 自己写的样式放在后面 防止被覆盖
import './statics/site/css/style.css'

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'
import layout from './components/layout.vue'
import goodslist from './components/good/goodslist.vue'
import goodsinfo from './components/good/goodsinfo.vue'
import shopcart from './components/shopcart/shopcart.vue'

Vue.use(VueRouter);
// 商品列表页轮播图
Vue.use(ElementUI);
// 商品列表页懒加载
Vue.use(VueLazyload);
// 导入状态管理
Vue.use(Vuex);

// 给vue原型添加一个$axios的方法
// 全局导入 因为要给axios添加一个根地址 所以不在config中全局导入
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://39.108.135.214:8899/"
    // 修改时间格式
Vue.filter('dateFmt', (input, dateFmtString = "YYYY-MM-DD") => {
    return moment(input).format(dateFmtString);
})

// 局部导入
import { addLocalInfo, getTotalCount, updateLocalInfo, deleteLocalInfo } from './common/localStorageTool.js'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/site/goodslist' },
        {
            path: '/site',
            component: layout,
            children: [
                { path: 'goodslist', component: goodslist },
                { path: 'goodsinfo/:goodsId', component: goodsinfo },
                { path: 'shopcart', component: shopcart }
            ]
        }
    ]
})

const store = new Vuex.Store({
    state: {
        buyCount: 0
    },
    getters: {
        getBuyCount(state) {
            if (state.buyCount > 0) {
                return state.buyCount;
            } else {
                return getTotalCount();
            }

        }
    },
    mutations: {
        addCount(state, goodsObj) {
            state.buyCount = addLocalInfo(goodsObj);
        },
        updateCount(state, goodsObj) {
            state.buyCount = updateLocalInfo(goodsObj);
        },
        deleteCount(state, goodsObj) {
            state.buyCount = deleteLocalInfo(goodsObj);
        }
    }
})


new Vue({
    el: "#app",
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render: h => h(App)
})
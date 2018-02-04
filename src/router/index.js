import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import axios from 'axios'
// 给vue原型添加一个$axios的方法
// 全局导入 因为要给axios添加一个根地址 所以不在config中全局导入
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://39.108.135.214:8899/"
axios.defaults.withCredentials = true;

// import layout from '../components/layout.vue'
// import goodslist from '../components/good/goodslist.vue'
// import goodsinfo from '../components/good/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/login/login.vue'
// import payOrder from '../components/order/payOrder.vue'
// import vipcenter from '../components/member/vipcenter.vue'
// import pcPaySuccess from '../components/order/pcPaySuccess.vue'
// import myOrder from '../components/member/myOrder.vue'
// import orderInfo from '../components/member/orderInfo.vue'

const layout = () =>
    import ('../components/layout.vue')
const goodslist = () =>
    import ('../components/good/goodslist.vue')
const goodsinfo = () =>
    import ('../components/good/goodsinfo.vue')
const shopcart = () =>
    import ('../components/shopcart/shopcart.vue')
const order = () =>
    import ('../components/order/order.vue')
const login = () =>
    import ('../components/login/login.vue')
const payOrder = () =>
    import ('../components/order/payOrder.vue')
const vipcenter = () =>
    import ('../components/member/vipcenter.vue')
const pcPaySuccess = () =>
    import ('../components/order/pcPaySuccess.vue')
const myOrder = () =>
    import ('../components/member/myOrder.vue')
const orderInfo = () =>
    import ('../components/member/orderInfo.vue')



const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/site/goodslist' },
        {
            path: '/site',
            component: layout,
            children: [
                { path: 'goodslist', component: goodslist },
                { path: 'goodsinfo/:goodsId', component: goodsinfo },
                { path: 'shopcart', component: shopcart },
                { path: 'login', component: login },
                { path: 'order/:ids', component: order, meta: { requireLogin: true } },
                { path: 'payOrder/:orderid', component: payOrder, meta: { requireLogin: true } },
                { path: 'pcPaySuccess', component: pcPaySuccess, meta: { requireLogin: true } },
                { path: 'vipcenter', component: vipcenter, meta: { requireLogin: true } },
                { path: 'myOrder', component: myOrder, meta: { requireLogin: true } },
                { path: 'orderInfo/:orderid', component: orderInfo, meta: { requireLogin: true } },
            ]
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin) {
        if (to.path != '/site/login') {
            localStorage.setItem('visitPath', to.path)
        }
        const url = 'site/account/islogin';
        axios.get(url).then(response => {
            if (response.data.code == 'nologin') {
                // 跳转到登录页面
                router.push({ path: 'login' });
            } else {
                // 如果已经是登录状态 则不阻拦
                next();
            }
        })
    } else {
        next()
    }

})

export default router;
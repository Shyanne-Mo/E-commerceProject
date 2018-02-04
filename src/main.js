//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import moment from 'moment'
// import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
// import 'element-ui/lib/theme-chalk/index.css'
// 自己写的样式放在后面 防止被覆盖
import './statics/site/css/style.css'
// 按需导入element-ui
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'
// 商品列表页轮播图
// Vue.use(ElementUI);
// 商品列表页懒加载
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
});
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
<template>
  <div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2>
                        <i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span> 放进购物车
                                </div>
                            </li>
                            <li class="active">
                                <div class="progress">
                                    <span>2</span> 填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span> 支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <div class="cart-box">
                    <h2 class="slide-tit">
                        <span>1、收货地址</span>
                    </h2>
                    <div id="orderForm" name="orderForm" url="">
                        <el-form :model="order" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form-box address-info">
                            <el-form-item label="收货人姓名" prop="accept_name" label-width="100px" style="width:500px">
                                <el-input v-model="order.accept_name"></el-input>
                            </el-form-item>
                            <el-form-item label="选择地区" prop="area" label-width="100px" style="width:500px">
                                <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value">
                                </v-distpicker>
                            </el-form-item>
                            <el-form-item label="详细地址" prop="address" label-width="100px" style="width:500px">
                                <el-input v-model="order.address"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="mobile" label-width="100px" style="width:500px">
                                <el-input v-model="order.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱" prop="email" label-width="100px" style="width:500px">
                                <el-input v-model="order.email"></el-input>
                            </el-form-item>
                            <el-form-item label="邮政编码" prop="post_code" label-width="100px" style="width:500px">
                                <el-input v-model="order.post_code"></el-input>
                            </el-form-item>
                        </el-form>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                        <el-radio v-model="order.payment_id" label='6'>在线支付</el-radio>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <el-radio-group v-model="order.express_id" @change="changeExpress">
                            <li>
                                <label>
                                       <el-radio label="1">顺丰快递:20元</el-radio>
                                </label>
                            </li>
                            <li>
                                <label>
                                       <el-radio label="2">圆通快递:10元</el-radio>
                                </label>
                            </li>
                            <li>
                                <label>
                                       <el-radio label="3">韵达快递:8元</el-radio>
                                </label>
                            </li>
                            </el-radio-group>
                        </ul>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in goodsData" :key="item.id">
                                    <td width="68">
                                        <a target="_blank" href="/goods/show-89.html">
                                            <img :src="item.img_url" class="img">
                                        </a>
                                    </td>
                                    <td>
                                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                    </td>
                                    <td>
                                        <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                        <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品
                                    <label class="price">{{getTotalInfo.totalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{getTotalInfo.totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥
                                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥
                                    <label id="totalAmount" class="price">{{getTotalInfo.totalPrice+order.expressMoment}}</label>
                                </p>
                                <p class="btn-box">
                                    <el-button @click="back" type="primary" round>返回购物车</el-button>
                                    <el-button @click="commit" type="success" round>确认提交</el-button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {getLocalInfo} from '../../common/localStorageTool.js'

  export default{
    data(){
        var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('必须输入数字'));
          } else {
              callback();
          }
        }, 1000);
      };
        return {
            goodsData:[],
            order:{
                accept_name:'zhangsan',
                address:'中粮商务公园',
                mobile:'18865500954',
                email:'abc@itcast.cn',
                post_code:'548000',
                payment_id:'6',
                expressMoment:20,
                express_id:'1',
                goodsAmount:0, //商品总价格
                message:'请尽快发货',
                goodsids:'',
                cargoodsobj:{},
                area:{
                    "province": {
                        "code": "440000",
                        "value": "广东省"
                    },
                    "city": {
                        "code": "440300",
                        "value": "深圳市"
                    },
                    "area": {
                        "code": "440306",
                        "value": "宝安区"
                    }
                }
            },
            rules:{
                accept_name:[{required:true}],
                address:[{required:true}],
                mobile:[{required:true,validator:checkMobile,trigger: 'blur'}],
                email:[{required:true}],
                post_code:[{required:true}],
                area:[{required:true,message:"请选择所属地区",trigger: 'blur'}]
            }
        }
    },
    created(){
        this.getGoodsData();
    },
    components: { 
        VDistpicker 
    },

    computed:{
        getTotalInfo(){
            let totalNum = 0;
            let totalPrice =0;
            this.goodsData.forEach(item => {
                totalNum += item.buycount;
                totalPrice += item.buycount * item.sell_price;
            });
            this.order.goodsAmount = totalPrice;
            return {
                totalNum,totalPrice
            }
        }
    },
    methods:{
        getGoodsData(){
            const url=`site/validate/order/getgoodslist/${this.$route.params.ids}`;
            const localInfo = getLocalInfo();
            this.$axios.get(url).then(response=>{
                response.data.message.forEach(item=>{
                    item.buycount = localInfo[item.id];
                })
                this.goodsData = response.data.message
            })
        },
        // 省级联动最后一个选项选择后触发的事件
        onSelected(data){
            this.order.area = data;
        },
        // 回到购物车
        back(){
            this.$router.push({path:'/site/shopcart'})
        },
        // 提交订单
        commit(){
            const url = 'site/validate/order/setorder';
            // 拿到选中的ids
            this.order.goodsids = this.$route.params.ids;
            this.goodsData.forEach(item=>{
                this.order.cargoodsobj[item.id] = item.buycount; 
            });
            this.$axios.post(url,this.order).then(response=>{
                if(response.data.status==1){
                    // 数据错误的话 不跳转
                    this.$message.error(response.data.message);
                    return;
                }else {
                    // 把订单中的商品数据 重新存到localstorage中
                    this.$store.commit('updateCounts',this.order.cargoodsobj);
                    this.$router.push({path:`/site/payOrder/${response.data.message.orderid}`})
                }
            })
        },
        changeExpress(){
            switch(this.order.express_id){
                case '1':
                    this.order.expressMoment = 20;
                    break;
                case '2':
                    this.order.expressMoment = 10;
                    break;
                case '3':
                    this.order.expressMoment = 8;
                    break;
            }
        }
    }
  }
</script>

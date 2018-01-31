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
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodsData" :key="item.id"> 
                                    <td width="48" align="center">
                                        <el-switch
                                          v-model="item.isSelected"
                                          active-color="#13ce66"
                                          inactive-color="#333333">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                      <img style="width:50px;height:50px" :src="item.img_url" alt="">
                                      <span>{{item.title}}</span>
                                    </td>
                                    <td align="left">{{item.sell_price}}</td>
                                    <td align="center"><choosenumber @changeNum='changeNumber' :choosenumber='item.buycount' :goodsId='item.id'></choosenumber> </td>
                                    <td align="left">{{item.sell_price * item.buycount}}元</td>
                                    <td align="center">
                                      <a href="javascript:;" @click="deleteGoods(item.id,index)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="10">
                                        <div class="msg-tips" v-if="goodsData.length<=0">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalInfo.totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalInfo.totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="goToBuy">继续购物</button>
                            <button class="submit" @click="goToOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

  </div>
</template>

<script>
import { getLocalInfo } from "../../common/localStorageTool.js";
import choosenumber from '../subcomponents/choosenumber.vue'
export default {
    data() {
        return {
        goodsData: []
        };
    },
    created() {
        this.getGoodsList();
    },
    components:{
        choosenumber
    },
    computed:{
        // 计算商品的总数和总金额
        getTotalInfo(){
        let totalNum = 0; 
        let totalPrice = 0;
        this.goodsData.forEach(item=>{
            if(item.isSelected){
            totalNum += item.buycount;
            totalPrice += item.buycount * item.sell_price;
            }
        });
        return {
            totalNum,
            totalPrice
        }  
        }
    },
    methods: {
        getGoodsList() {
            const goodsInfo = getLocalInfo();
            let goodsArray = [];
            // 如果localstorage中有值的时候 才去获取商品数据
            if(JSON.stringify(goodsInfo)!='{}'){
                // 拿到localstorage中的商品的id
                for (let key in goodsInfo) {
                    goodsArray.push(key);
                }
                const url = `site/comment/getshopcargoods/${goodsArray.join(",")}`;
                this.$axios.get(url).then(response => {
                    response.data.message.forEach(item => {
                    // 原来数据中的buycount都为0 修改为正确的值
                    item.buycount = goodsInfo[item.id];
                    item.isSelected = true;
                    });
                    this.goodsData = response.data.message;
                });
            }    
        },
        changeNumber(obj){
            // 在子组件触发父组件的时候 调用修改localstorage的方法
            this.$store.commit('updateCount',obj);
            // 拿到修改后的对象,要同步修改当前goodsData中的数量的值 这样总数和总金额才会同步变化
            this.goodsData.forEach(item=>{
                if(item.id==obj.goodsId){
                    item.buycount = obj.choosenumber;
                }
            })
        },
        deleteGoods(goodsId,index){
            this.$confirm('是否删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            // 删除localstorage中的值
            this.$store.commit('deleteCount',goodsId);
            // 删除购物车数据中的对应下标的值 触发计算属性
            this.goodsData.splice(index,1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        goToBuy(){
            this.$router.push({path:'/site/goodslist'});
        },
        goToOrder(){
            const ids =[];
            // const goodsObj ={};
            this.goodsData.forEach(item=>{
                if(item.isSelected){
                    ids.push(item.id);
                    // goodsObj[goodsId] = item.id;
                    // goodsObj[count] = item.buycount;
                }
            });
            // 修改本地localstorage的商品数据
            // 去到订单页面
            this.$router.push({path:`/site/order/${ids.join(',')}`});
        }
            
    }
  
};
</script>


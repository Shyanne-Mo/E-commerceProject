<template>
  <div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="javascript:;">支付中心</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <div class="nav-tit pay">
                    <a href="javascript:;" class="selected">支付中心</a>
                </div>
                <div class="form-box payment">
                    <div class="el-row">
                        <div class="el-col el-col-16">
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>订 单 号：</dt>
                                        <dd>{{orderData.order_no}}</dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>收货人姓名：</dt>
                                        <dd>{{orderData.accept_name}}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>送货地址：</dt>
                                        <dd>{{orderData.area}}
                                        </dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>手机号码：</dt>
                                        <dd>{{orderData.mobile}}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>支付金额：</dt>
                                        <dd>{{orderData.order_amount}} 元</dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>支付方式：</dt>
                                        <dd>在线支付</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="message">
                                <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                <span>{{orderData.message}}</span>
                            </div>
                        </div>
                        <div class="el-col el-col-8">
                            <div id="container2">
                                <img id="imgLogo" src="../../statics/site/images/hhh.jpg" hidden>
                                <div id="container2">
                                    <canvas width="400" height="400"></canvas>
                                </div>
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
import '../../statics/site/js/qrcode/jqueryqr.js'


  export default {
    data(){
      return {
        orderData:{},
        timerId:null
      }
    },
    created(){
      this.getOrderData();
      this.getOrderStatus();
    },
    beforeDestroy(){
        if(this.timerId){
            clearInterval(this.timerId);
        }
    },
    mounted(){
      // 初始化jquery的qrcode插件
      setTimeout(() => {
        $('#container2').erweima({
            mode: 4,
            mSize: 22,//最大只能设置这么大，否则太大，扫描不出来
            text: `http://39.108.135.214:8899/site/validate/pay/alipay/${this.$route.params.orderid}`,
            image: $("#imgLogo")[0]
        });
      }, 200);
    },
    methods:{
      getOrderData(){
        const url = `site/validate/order/getorder/${this.$route.params.orderid}`;
        this.$axios.get(url).then(response=>{
          this.orderData = response.data.message[0]
        })
      },
      getOrderStatus(){
          this.timerId = setInterval(() => {
              const url = `site/validate/order/getorder/${this.$route.params.orderid}`;
              this.$axios.get(url).then(response=>{
                  let status = response.data.message[0].status
                  if(status==2){
                      this.$router.push({path:'/site/pcPaySuccess'});
                  }
              })
          }, 3000);
      }
    }
  }
</script>
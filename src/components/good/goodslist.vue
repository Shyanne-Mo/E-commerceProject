<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a  v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel :interval="5000" arrow="always">
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt()}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodsGroup" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a :href="'/goods/'+subitem.subcateid+'.html'" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a :href="'/goods/'+item.level1cateid+'.html'">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="datas in item.datas" :key="datas.artID">
                            <router-link :to="'/site/goodsinfo/'+datas.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="datas.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{datas.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{datas.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{datas.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{datas.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  .el-carousel__container{
        height: 341px;
    }

    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    
    export default {
        data (){
          return {
            goodsData:{},
            goodsGroup:[]
          }
        },
        created (){
          this.getGoodsData();
          this.getGoodsGroup();
        },
        methods:{
          getGoodsData(){
            const url = "site/goods/gettopdata/goods"
            this.$axios.get(url).then(response=>{
              this.goodsData = response.data.message;
            })
          },
          getGoodsGroup(){
              const url = "site/goods/getgoodsgroup"
              this.$axios.get(url).then(response=>{
                  this.goodsGroup = response.data.message;
              })
          }
        }
    }
</script>

<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div v-if="goodsData.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <el-input-number :min="1" :max="goodsData.goodsinfo.stock_quantity" size="small" v-model="number"></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="shopCartStart" @click="addShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;"> 
                                <ul>
                                    <li>
                                        <a @click="isShowToggle(true)" href="javascript:;" :class="isShowIntro?'selected':''">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isShowToggle(false)" href="javascript:;" :class="!isShowIntro?'selected':''">商品评论</a>
                                    </li>
                                </ul>
                                
                            </div>
                            </Affix>
                            <div v-show="isShowIntro" class="tab-content entry" style="display: block;">
                                <span v-html="goodsData.goodsinfo.content"></span>
                            </div>
                            <div v-show="!isShowIntro" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="commentData.totalcount<=0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentData.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss') }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div class="block">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[1, 2, 10, 20]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="commentData.totalcount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time |dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 定义购物车动画 -->
        <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        >
            <div v-show="isShowPic" id="pic" class="pic" v-if="goodsData.imglist">
                <img :src="goodsData.imglist[0].original_path">
            </div>
        </transition>
    </div>
</template>

<style>

    @import "../../statics/site/js/jqimgzoom/css/magnifier.css";
    .pic {
        width: 30px;
        height: 30px;
        position: absolute;
        transition:all 1s;
    }
    .pic img {
        width: 100%;
    }
</style>
    
<script>  

    
    import "../../statics/site/js/jqimgzoom/js/magnifier.js";
    import {Affix} from 'iview'

    export default{
        data(){
            return {
                goodsData:{},
                isShowIntro:true,
                commentData:{},
                currentPage:1,
                pageSize:2,
                number:1,
                isShowPic:false,
                startOffset:null,
                endOffset:null
            }
        },
        created(){
            this.getGoodsData();
            this.getCommentData();
        },
        components:{
            Affix
        },
        watch:{
            $route:function(newVal){
                this.number=1;
                this.getGoodsData();
                this.getCommentData();
            }
        },
        // 创建之后就获取购物车动画的坐标位置
        mounted(){
            setTimeout(() => {
                this.startOffset = $(this.$refs.shopCartStart).offset();
                this.endOffset = $('#shopCartEnd').offset();
                // $('.pic').css({left:this.startOffset.left,top:this.startOffset.top});
            }, 500);
        },
        methods:{
            getGoodsData(){
                const url=`site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
                this.$axios.get(url).then(response=>{
                    this.goodsData = response.data.message;
                    setTimeout(() => {
                        $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
                    }, 200);
                })
            },
            isShowToggle(isShow){
                this.isShowIntro = isShow;
            },
            getCommentData(){
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`
                this.$axios.get(url).then(response=>{
                    this.commentData = response.data;
                })
            },
            // 分页插件
            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
                this.getCommentData();
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.getCommentData(); 
            },
            // 提交评论
            postComment() {
                const commenttxt = this.$refs.comment.value;
                if(commenttxt.trim().length<=0){
                    this.$message({
                        message: '评论内容不能为空',
                        type: 'warning'
                    });
                    return;
                }else{
                    const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
                    this.$axios.post(url,{
                        commenttxt
                    }).then(response=>{
                        if(response.data.status==0){
                            this.$message({
                                message: '评论成功!',
                                type: 'success'
                            });
                            this.$refs.comment.value = '';
                            this.currentPage=1;
                            this.getCommentData();
                        }else if(response.data.status==1){
                            this.$message({
                                message: '添加数据失败',
                                type: 'warning'
                            });
                        }
                    })
                }  
            },
            
            // 购物车动画
            addShopCart(){
                 this.isShowPic=true;
                 let obj = {goodsId:this.$route.params.goodsId,count:this.number};
                 this.$store.commit('addCount',obj); 
            },
            beforeEnter: function (el) {
                el.style.left = this.startOffset.left + 'px';
                el.style.top = this.startOffset.top + 'px';
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                el.offsetWidth;
                el.style.left = this.endOffset.left + 'px';
                el.style.top = this.endOffset.top + 'px';
                done()
            },
            afterEnter: function (el) {
                this.isShowPic=false;
            }
        }
    }
</script>

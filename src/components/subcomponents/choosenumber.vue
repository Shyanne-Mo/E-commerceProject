<template>
  <div>
    <div @click="subNum" class="left">-</div>
    <div class="middle">{{number}}</div>
    <div @click="addNum" class="right">+</div>
  </div>
</template>
<style>
  .left,.middle,.right {
    display:inline-block;
    width: 30px;
    height: 30px;
    border:1px solid #ccc;
    text-align: center;
    line-height: 30px;
  }
</style>

<script>
  
  export default {
    data () {
      return {
        number:1
      }
    },
    props: ['choosenumber','goodsId'],
    created(){
      // 把传过来的值赋给number
      this.number = this.choosenumber
    },
    methods:{
      addNum(){
        this.number++;
        this.$emit('changeNum',{
          goodsId:this.goodsId,
          choosenumber:this.number
        });
      },
      subNum(){
        if(this.number<=1) return;
        this.number--;
        this.$emit('changeNum',{
          choosenumber:this.number,
          goodsId:this.goodsId
        });
      }
    }
  }
</script>

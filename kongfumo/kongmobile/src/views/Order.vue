<template>
    <div class="order">
        <div class="title">
            <div class="back" @click="back">
      <van-icon name="arrow-left" />
    </div>
            我的订单</div>
         
        <van-card
  :num=item.num
  :price=item.price
  :desc=item.addtime1.slice(0,10)
  :title=item.bname
  :thumb=item.bimg
  v-for="(item,key) in goods" :key="key"
/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goods:[]
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        }
    },
    mounted() {
        let that=this;
        this.axios
      .post("/public/orderSelect")
      .then(function(res) {

       that.goods=res.data;
      
      })
      .catch(function(error) {
        console.log(error);
      });
    },
}
</script>
<style lang="scss" scoped>
    .title{
        font-size: 0.18rem;
        text-align: center;
        height: 0.5rem;
        position:relative;
        line-height: 0.5rem;
        background-color: #fff;
    }
    .back{
        position: absolute;
        left:0px;
        top:0px;
    }
</style>
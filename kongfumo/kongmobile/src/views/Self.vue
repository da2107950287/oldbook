<template>
    <div class="self">
        <div class="logo">
            <div class="img"><img src="../imgs/11253032.gif" alt=""></div>
            <div class="name">名称</div>
        </div>
<div class="box">
<div class="box1" @click="myself"><span>个人资料</span></div>
<div class="box2"><span>收藏夹</span><span class="sty"></span></div>
<div class="box3" @click="list"><span>我的订单</span><span class="sty"></span></div>
</div>
<div class="shopcart">
<div class="center"><div>我的订单</div><div class="right">查看更多></div></div>
<div class="content1">
    <div><van-icon name="bag-o" /><span class='stycontent'>待确认</span></div>
    <div><van-icon name="balance-list-o" /><span class='stycontent'>待付款</span></div>

    <div><van-icon name="refund-o" /><span class='stycontent'>待发货</span></div>
    <div><van-icon name="todo-list-o" /><span class='stycontent'>待收货</span></div>
    <div><van-icon name="logistics" /><span class='stycontent'>退货退款</span></div>



</div>
</div>

<tabbar></tabbar>
    </div>
</template>
<script>
export default {
   created(){
      
   },
   methods:{
       myself(){
           this.$router.push({name:"accountuser"})
       },
       list(){
          this.$router.push({name:"order"}) 
       }
   }
}
</script>
<style lang="scss" scoped>
    .self{
        min-height: 3rem;
    background-color: #f3f3f3;
    box-sizing: border-box;
    
    }
    .logo{
      
        height:1.5rem;
        display:flex;
        align-items: center;
       
        .img,img{
            width:0.8rem;
            height:0.8rem;
            border-radius: 50%;
            
        }
        .img{
            margin-left: 0.8rem;
            margin-right: 0.2rem;
        }
    }
.box,.shopcart{
    width: 80%;
    height: 0.8rem;
    box-shadow: 0 0.06rem 0.16rem 0 hsla(0,0%,60%,.1);
    border-radius: .14rem;
    background: #fff;
    margin:auto;
    display:flex;
    align-items: center;
    justify-content: space-around;
.sty{
    margin-left: 0.04rem;
    color: #c5c3c3;
}
}
.shopcart{
    margin-top: 0.1rem;
    width:90%;
    height: auto;
    padding: 0.2rem;
    flex-direction: column;
    justify-content: flex-start;
}
.center{
    width:100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.14rem;
.right{
    font-size: 0.12rem;
    color: #c5c3c3;
}
}
.content1{
    margin-top: 0.1rem;
    display: flex;
    flex-wrap: wrap;
    div{
        width: 140px;
        height:50px;
      font-size: 0.3rem;
        display: flex;
        margin-top: 0.2rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
.stycontent{
    margin-top: 0.05rem;
    font-size: 0.14rem;
}
    }
}
</style>
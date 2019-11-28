<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/shop" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/Self" icon="friends-o">个人中心</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: "tabbar"
};
</script>
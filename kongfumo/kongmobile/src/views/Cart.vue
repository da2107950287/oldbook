<template>
  <div class="cart">
    <div class="title">
      购物车
      <span>(1)</span>
    </div>
    <div class="content" v-if="tag">
      <div class="cartempty">
        <img src="../imgs/购物车.png" alt />
        <div class="empty1">购物车是空的</div>
        <div class="empty2">去逛逛</div>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag: true
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  height: 0.7rem;
  font-size: 0.2rem;
  width: 100vw;
  background-color: #fff;
  line-height: 0.7rem;
}
.content {
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartempty {
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }
  .empty1 {
    margin-top: 0.1rem;
    color: #999;
    height: 0.25rem;
    line-height: 0.25rem;
  }
  .empty2 {
    width: 0.8rem;
    height: 0.4rem;
    border: 1px solid rgb(240, 61, 61);
    border-radius: 0.03rem;
    line-height: 0.4rem;
    text-align: center;
    margin-top: 0.1rem;
    background-color: #fff;
  }
}
</style>
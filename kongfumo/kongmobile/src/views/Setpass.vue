<template>
  <div>
    <van-nav-bar class="mynb" title="设置密码" left-arrow @click-left="goBackFn" />

    <van-field v-model="password"  placeholder="请输入密码" />
    <van-field type="password" v-model="password1"  placeholder="请再次输入密码" />
    <div class="tip1">密码为6-20个字符，可以有英文、数字、特殊字符组合。</div>
    <van-button class="mybtn" block size color="#C7C7C7" type="primary">下一步</van-button>
    
    
  </div>
</template>
<script>
export default {
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
  
  },
  data() {
    return {
      password: "",
      password1: "",
    };
  }
};
</script>
<style scoped>

.tip1{
    padding-left: 4px;
    color: #C7C7C7;
    font-size: 0.12992rem;
    text-align: center;
}
.van-nav-bar {
  height: 0.635rem;
  line-height: 0.635rem;
  margin-bottom: 0.244267rem;
}
.van-hairline--bottom::after {
  border: none;
}
.van-cell {
  font-size: 0.195413rem;
  padding: 0.207627rem 0.1832rem;
}

.van-nav-bar__title {
  font-size: 0.21984rem;
}
.van-nav-bar__arrow {
  font-size: 0.24422rem;
  color: rgb(140, 140, 140);
}
.mybtn {
  width: 84%;
  height: 0.573906rem;
  font-size: 0.207627rem;
  margin: 0 auto;
  margin-top: 0.244267rem;
}
.tip {
    width: 100%;
    text-align: center;
    color: #999999;
    font-size: 0.158773rem;
    margin-top: 0.244267rem;
}
</style>
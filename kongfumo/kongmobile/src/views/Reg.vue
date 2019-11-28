<template>
  <div>
    <van-nav-bar class="mynb" title="注册" left-arrow @click-left="goBackFn" />

    <van-field v-model="username" label="用户名:" placeholder="请输入用户名" />
    <van-field v-model="password" label="密码:" placeholder="请输入密码" />
    <van-button class="mybtn" block size color="#C7C7C7" type="primary" @click="reg()">注册</van-button>
    <div class="tip">
      注册即表示您同意
      <span class="red">
        <a href="http://help.kongfz.com/?act=detail&amp;contentId=553" class="red">《孔夫子旧书网服务协议》</a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
  reg(){
if(this.username.length==0)
{
this.$toast("用户名不能为空");
}
if(this.password.length==0)
{
  this.$toast("密码不能为空");
}
let that = this;
      this.axios
        .post("/public/zhucemobile", { value: this.username, pass: this.password })
        .then(function(res) {
          if (res.data.name == "ok") {
            that.$toast("注册成功");
            that.$router.push({name:"login"}); 
          } else if (res.data.name == "exit") {
           that.$toast("用户名已存在");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  },
  data() {
    return {
      msg: "注册页面",
      username: "",
      password: "",
    };
  }
};
</script>
<style scoped>
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
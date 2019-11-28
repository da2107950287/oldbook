<template>
  <div>
    <div class="login">
      <div>登录</div>
    </div>
    <div class="close" @click="first">×</div>
    <div class="login_input">
      <van-field v-model="value" placeholder="请输入用户名" label="用户名" required />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      <div class="pass">
        <span>忘记密码？</span>
      </div>
      <div class="login-button">
        <van-button type="primary" size="large" @click="submit">登录</van-button>
      </div>
      <div class="pass" @click="reg">
        <span>注册</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      password: ""
    };
  },
  methods: {
    reg(){
      this.$router.push({name:"login"})
    },
    submit() {
      let that = this;
      this.axios
        .post("/public/loginmobile", { value: this.value, pass: this.password })
        .then(function(res) {
          if (res.data.tag == "ok") {
            that.$toast("欢迎进入书网");
            that.$router.replace("/");
          } else if (res.data.tag == "no") {
           that.$toast("账号或者密码错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    first() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  text-align: center;
  height: 0.6rem;
  font-size: 0.22rem;
  padding-top: 0.1rem;
}
.close {
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
  font-size: 0.26rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.3rem;
  background-color: #f8f8f8;
}
.login_input {
  margin-top: 0.4rem;
  padding: 0 0.4rem 0 0.4rem;
}
.login-button {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.pass {
  display: flex;
  justify-content: flex-end;
  p {
    font-size: 0.18rem;
    color: #999999;
  }
}
</style>
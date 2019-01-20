<template>
  <div class="login-page">
    <div class="login-bar">
      <h1>商家登陆平台</h1>
      <div id="login">
        <form>
          <input type="text" placeholder="请输入账号" v-model="merchantname">
          <input type="password" placeholder="请输入密码" v-model="password">
          <div class="buttons">
            <button v-on:click="login" class="loginBtn">登录</button>
            <button v-on:click="regist" class="registBtn">注册</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "../assets/javascripts/cookie.js";
export default {
  data() {
    return {
      merchantname: "",
      password: ""
    };
  },
  mounted() {
    this.$axios
      .get("/foods", {
        data: { merchant_id: 1 }
      })
      .then(function(res) {
        console.log(res);
      });
    if (getCookie("merchantname")) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      if (!this.merchantname || !this.password) {
        this.$message({
          type: "error",
          message: "请输入账号和密码"
        });
      } else {
        let logdata = {
          merchantname: this.merchantname,
          password: this.password
        };
        // 调用后台校验函数
        if (0) {
          this.$message({
            type: "error",
            message: "账号或密码错误"
          });
        } else {
          setCookie("merchantname", "abc123", 1000);
          this.$message({
            type: "success",
            message: "登录成功"
          });
          this.$router.push("/");
        }
      }
    },
    regist() {}
  }
};
</script>

<style scoped>
.login-page {
  background: url("../assets/images/merchant.jpg") center no-repeat;
  background-size: 100% 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

h1 {
  margin: 40px;
}

.login-bar {
  text-align: center;
  position: relative;
  top: 200px;
}

input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}

.buttons {
  width: 250px;
  margin: 20px auto;
}

.loginBtn {
  float: left;
}

.registBtn {
  float: right;
}
</style>


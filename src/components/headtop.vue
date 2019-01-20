/* eslint-disable */
<template>
  <div class="headtop">
    <div class="search-bar" v-if="this.$router.history.current.name == 'orders'">
      <el-input class="search-input" placeholder="搜索订单 订单号 下单时间 桌号等" v-bind:value='value' v-on:input="$emit('input', $event)" @keyup.enter.native="test"></el-input>
    </div>
    <el-button v-if="this.$router.history.current.name == 'orders'" class="search-icon" icon="el-icon-search" circle v-on:click="$emit('search')"></el-button>
    <el-dropdown class="user-avator" @command="handleCommand">
      <img src="../assets/images/user.png" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { delCookie } from "../assets/javascripts/cookie.js";

export default {
  props: ["value"],
  data() {
    return {};
  },
  created() {},
  methods: {
    handleCommand(command) {
      if (command == "home") {
        this.$router.push("/");
      }
      if (command == "signout") {
        // sign out
        // to do
        const res = { status: 1, message: "not log in" };
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "退出成功"
          });
          delCookie("merchantname");
          this.$router.push("/login");
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      }
    },
    test(event) {
      console.log(event);
    }
  }
};
</script>

<style>
.headtop {
  padding: 5px;
  background-color: #eff2f7;
  height: 40px;
}

.headtop .search-bar {
  width: 300px;
  height: 100%;
  float: left;
}

.headtop .search-icon {
  margin-left: 10px;
  float: left;
}

.headtop .user-avator {
  margin-right: 20px;
  margin-top: 5px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  float: right;
}

.headtop .user-avator img {
  width: 100%;
  height: 100%;
}
</style>

/* eslint-disable no-alert, no-console */
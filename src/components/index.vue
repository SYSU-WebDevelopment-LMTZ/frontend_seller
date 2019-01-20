<template>
    <div class="fillcontain">
        <el-row style="height: 100%">
            <el-col :span=4 class="side-bar" style="min-height: 100%; background-color: #545b64">
                <el-menu style="min-height: 100%" background-color="#545b64" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            商家管理
                        </template>
                        <el-menu-item index="merchantManage">信息管理</el-menu-item>
                        <el-menu-item index="menuManage">菜单管理</el-menu-item>
                    </el-submenu>

                    <el-menu-item index="orders">
                        <i class="el-icon-tickets"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>

                    <!-- <el-menu-item index="data">
                        <i class="el-icon-more"></i>
                        <span slot="title">营业数据</span>
                    </el-menu-item> -->

                </el-menu>
            </el-col>

            <el-col :span="20" style="height: 100%; overflow:auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// to do 每个axios请求，带上请求失败的callback
import { serCookie, getCookie } from "../assets/javascripts/cookie.js";
export default {
  mounted() {
    // 没有cookie先进登录界面
    if (!getCookie("merchantname")) {
      this.$router.push("/login");
    }
  },
  created() {},
  methods: {}
};
</script>

<style>
.fillcontain {
  height: 100%;
  overflow: auto;
}

.fillcontain .side-bar {
  text-align: center;
  overflow: hidden;
}
</style>


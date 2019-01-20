<template>
  <div class="merchant-manage">
    <headtop></headtop>

    <div class="information" ><!--v-loading="loading"-->
      <div class="merchant-logo">
        <!--img src="merchant_info.logo" /-->
        <img src="../assets/images/merchant.jpg" />
      </div>
      <el-form class="info-form" ref="form" :model="merchant_info" label-width="80px">
        <el-form-item label="店名" style="width: 400px">
          <el-input v-model="merchant_info.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" style="width: 400px">
          <el-input v-model="merchant_info.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介" style="width: 90%;">
          <el-input type="textarea" :rows="3" v-model="merchant_info.description"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headtop from "./headtop";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "至善坊",
        date1: new Date(2018, 6, 6, 9, 0),
        date2: new Date(2018, 6, 6, 21, 0),
        delivery: true,
        desc:
          "餐饮连锁机构",
        phone: "15521160474"
      },
      loading: true,
      tel: 1213814,
      merchant_info: {}
    };
  },
  created() {
    this.getData();
  },
  components: {
    headtop
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form.date1);
    },
    getData() {
      console.log('get restaurant info')
      const url = 'http://localhost:5000/restaurant/self/info'
      axios.get(url)
        .then((response) => {
          console.log('get restaurant info success')
          console.log(response.data)
          this.merchant_info = response.data
        })
        .catch(function (error) {
          console.log('get restaurant info fail')
          console.log(error)
        })
    }
  }
};
</script>

<style scoped>
.merchant-manage .merchant-logo {
  margin-top: 20px;
  text-align: center;
}
.merchant-manage .merchant-logo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.info-form {
  margin-top: 20px;
}
</style>

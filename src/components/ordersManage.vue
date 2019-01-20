<template>
  <div class="orders">
    <headtop v-model="searchText" v-on:search="search"></headtop>
    <el-tag class="info-tag">
      今日订单
    </el-tag>

    <div class="orders-table">
      <el-date-picker class="date-picker" v-model="inputDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>

      <el-button type="primary" icon="el-icon-search" @click="searchOrder">搜索</el-button>

      <el-table class="order" border :data="allorders" style="width: 100%" ><!--v-loading="loading"-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="桌号">
                <span>{{ props.row.tableid }}</span>
              </el-form-item>
              <el-form-item label="是否已支付">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.note }}</span>
              </el-form-item>
              <el-form-item label="商品"></el-form-item>
            </el-form>
            <el-table :data="props.row.dishes" header-align="center" size="mini" border>
              <el-table-column label="菜品" prop="dishname" header-align="center" align="center"></el-table-column>
              <el-table-column label="份数" prop="dishcount" header-align="center" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderid">
        </el-table-column>
        <el-table-column label="订单金额" prop="price">
        </el-table-column>
        <el-table-column label="下单日期" prop="ordertime">
        </el-table-column>
        <el-table-column label="订单状态" prop="state">
          <template slot-scope="scope">
            {{ scope.row.state }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="pagination" layout="prev, pager, next" :total="pages">
      </el-pagination>

      <!-- to do 分页栏 -->
    </div>
  </div>
</template>

<script>
// to do
// 1. 查询订单功能
// 2. 分页

import headtop from "./headtop";
import axios from "axios";

export default {
  data() {
    return {
      searchText: "",
      // allorders: ORDERS,
      allorders: [],
      orders_map: [],
      merchant_id: this.merchant.merchant_id,
      inputDate: "",
      loading: true,
      pages: 5,
      startDate: "",
      endDate: ""
    };
  },
  created() {
    this.getData();
    // console.log(this.merchant);
  },
  components: {
    headtop
  },
  methods: {
    search: function() {
      var text = this.searchText;
      // to do
      // search orders
    },
    getData: function() {
      console.log('get all orders')
      const url = 'http://localhost:5000/order'
      axios.get(url)
        .then((response) => {
          this.allorders = response.data
          console.log('get all orders success')
          console.log(response.data)
        })
        .catch(function (error) {
          console.log('get all orders fail')
          console.log(error)
        })
    },
    reArraneOrder() {
      var startDate = new Date(that.startDate);
      var endDate = new Date(that.endDate);
      that.allorders.forEach(element => {
        var publish_at = new Date(element.publish_at);
        if (publish_at >= startDate && publish_at <= endDate) {
          element.show = true;
        } else {
          element.show = false;
        }
      });
    },
    searchOrder(event) {
      that.loading = true;
      console.log(event);
    }
  }
};
</script>

<style scope>
.info-tag {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
}

.orders-table {
  margin-top: 20px;
}

.orders-table .date-picker {
  margin-left: 20px;
  margin-bottom: 20px;
}

.orders-table .pagination {
  margin-top: 20px;
  text-align: center;
}

.order {
  max-width: 95%;
  margin: 0 auto;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>



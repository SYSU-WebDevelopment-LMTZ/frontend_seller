<template>
  <div class="business-data">
    <headtop></headtop>

    <el-date-picker class="date-picker" v-model="inputDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>

    <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>

    <el-table class="data-table" border :data="dataMap" style="width: 100%"><!-- v-loading="loading"-->
      <el-table-column label="下单日期" prop="date">
      </el-table-column>
      <el-table-column label="总销售额" prop="total_price">
      </el-table-column>
      <el-table-column label="总订单数" prop="total_orders">
      </el-table-column>
      <el-table-column label="顾客总数" prop="total_customers">
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" layout="prev, pager, next" :total="pages">
    </el-pagination>
  </div>

  <!-- 分页栏 -->

</template>

<script>
// to do
// 添加日期选择框 查询
// 添加分页
import headtop from "./headtop";

export default {
  props: ["businessData"],
  data() {
    return {
      startDate: "2018/06/15",
      endDate: "2018/06/29",
      dataMap: [],
      orders: DATA,
      inputDate: "",
      loading: true,
      pages: 1
    };
  },
  components: {
    headtop
  },
  created() {
    Array.prototype.push_front = function(item) {
      this.splice(0, 0, item);
    };
    this.getOrdetData();
  },
  methods: {
    searchData(event) {
      this.startDate = this.inputDate[0];
      this.endDate = this.inputDate[1];
      if (this.startDate != undefined && this.endDate != undefined) {
        this.loading = true;
        this.getBusinessData();
        this.loading = false;
      }
    },
    getOrdetData() {
      const that = this;
      const url = "/orders";
      this.$axios
        .get(url, {
          params: {
            merchant_id: 1
          }
        })
        .then(function(res) {
          that.orders = res.data.data;
          console.log(that.orders);
          that.setTotalPrice(that.orders);
          that.getBusinessData();
          that.loading = false;
        });
    },
    getBusinessData() {
      // 先看看目前已经计算的数据的上界和下界
      // 想一下缓存
      this.dataMap = [];
      var dataMap = this.dataMap;
      var maxDate = undefined,
        minDate = undefined;
      maxDate = dataMap.length != 0 ? dataMap[0].date : undefined;
      minDate = dataMap.length > 1 ? dataMap[dataMap.length - 1].date : maxDate;
      // 上面是缓存部分，还没想好怎么写
      this.computeData(this.startDate, this.endDate);
    },
    computeData(start, end) {
      // 遍历从第一天开始到最后一天的所有日期
      var startDate = new Date(start),
        endDate = new Date(end);
      var daymis = 3600 * 24 * 1000;
      var now = startDate;
      while (now < endDate) {
        let defaultData = this.getDayData(now);
        this.dataMap.push_front(defaultData);
        now = new Date(now.getTime() + daymis);
      }
    },
    getDayData(nowDate) {
      var orders = this.orders;
      var order_date = undefined;
      var tp = Math.round(Math.random() * 10000);
      var defaultData = {
        date: nowDate.toLocaleDateString(),
        total_price: 0,
        total_orders: 0,
        total_customers: 0
      };
      orders.forEach(element => {
        order_date = new Date(element.create_at);
        if (defaultData.date == order_date.toLocaleDateString()) {
          defaultData.total_price += element.total_price;
          defaultData.total_orders += 1;
          defaultData.total_customers += element.num_of_people;
        }
      });
      return defaultData;
    },
    setTotalPrice(orders) {
      orders.forEach(element => {
        var price = 0;
        var foods = element.foods.split("|");
        foods.forEach(f => {
          var temp = f.split(",");
          price += parseFloat(temp[1]) * parseFloat(temp[2]);
        });
        element.total_price = price;
      });
    }
  }
};

const DATA = [
  {
    order_id: 23,
    merchant_id: 1,
    merchant_name: "兰州牛肉",
    merchant_tel: "12341234123",
    open_id: "abc",
    desk_id: 2,
    num_of_people: 3,
    paid: true,
    foods: ["汉堡, 12.5, 1", "芝士蛋糕, 22.5, 2"],
    remark: "不要辣",
    create_at: "Thu Jun 28 2018 23:52:21 GMT+0800 (CST)"
  },
  {
    order_id: 33,
    merchant_id: 1,
    merchant_name: "兰州牛肉",
    merchant_tel: "12341234123",
    open_id: "abc",
    desk_id: 2,
    num_of_people: 3,
    paid: true,
    foods: ["汉堡, 12.5, 1", "芝士蛋糕, 22.5, 2"],
    remark: "不要辣",
    create_at: "Thu Jun 28 2018 23:52:21 GMT+0800 (CST)"
  }
];
</script>


<style>
.data-table {
  max-width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}

.business-data .date-picker {
  margin: 20px 0 0 20px;
}

.business-data .pagination {
  text-align: center;
  margin-top: 20px;
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
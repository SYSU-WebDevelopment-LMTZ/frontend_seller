<template>
  <div class="merchant-manage">
    <headtop></headtop>

    <h1>菜单管理</h1>

    <el-button @click="addNewMenu(menu_items)" type="primary" class="addMenuBtn">新增</el-button>
    <div>
      <el-table :data="menu_items" border class="m-table">
        <template>
          <el-table-column label="logo">
            <template slot-scope="scope">
              <span v-if="!scope.row.if_modify">
                <img :src="scope.row.imageurl" class='imgsize'/>
              </span>
              <span v-if="scope.row.if_modify">
                <el-input v-model="scope.row.imageurl" placeholder="请输入图片链接"></el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="名字">
            <template slot-scope="scope">
              <span v-if="!scope.row.if_modify">{{scope.row.name}}</span>
              <span v-if="scope.row.if_modify">
                <el-input v-model="scope.row.name" placeholder="请输入菜名"></el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="简介">
            <template slot-scope="scope">
              <span v-if="!scope.row.if_modify">{{scope.row.description}}</span>
              <span v-if="scope.row.if_modify">
                <el-input v-model="scope.row.description" placeholder="请输入简介"></el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              <span v-if="!scope.row.if_modify">{{scope.row.price}}</span>
              <span v-if="scope.row.if_modify">
                <el-input v-model="scope.row.price" placeholder="请输入价格"></el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否下架">
            <template slot-scope="scope">
              <span v-if="!scope.row.if_modify">{{scope.row.shelves ? "是" : "否"}}</span>
              <span v-if="scope.row.if_modify">
                <el-radio-group v-model="scope.row.shelves">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.if_modify" type="primary" @click="modifyMenuItem(scope.row)">
                修改
              </el-button>
              <el-button v-if="scope.row.if_modify" type="primary" @click="confirmModify(scope.row)">
                确定
              </el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

  </div>
</template>

<script>
// import Vue from 'Vue';
import headtop from "./headtop";
import axios from "axios";

export default {
  data() {
    return {
      menu_items: [{}],
      checked_types: [],
      add_types: ""
    };
  },
  components: {
    headtop
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      this.menu_items = [];
      console.log('get all dishs')
      const url = 'http://localhost:5000/dish'
      axios.get(url)
        .then((response) => {
          this.menu_items = response.data
          console.log('get all dishs success')
          console.log(response.data)
        })
        .catch(function (error) {
          console.log('get all dishs fail')
          console.log(error)
        })
    },
    clearCaches: function() {
      this.checked_types = [];
      this.add_types = "";
    },
    modifyMenuItem: function(row) {
      this.clearCaches();
      row["if_modify"] = true;
    },
    confirmModify: function(row) {
      row["if_modify"] = false;
      row["dish_type"] = this.checked_types.join(",");
      if (this.add_types !== "" && this.checked_types.indexOf(this.add_types) < 0){
        row["dish_type"] = (row["dish_type" !== ""]) ? (row["dish_type"] + "," + this.add_types) : this.add_types;
      }
      row["dish_id"] < 0 ? this.addSync(row) : this.updateSync(row);
    },
    
    addNewMenu: function(menu_items) {
      this.clearCaches();
      menu_items.splice(0, 0, {
        dish_id: -1,
        logo: "",
        dish_name: "",
        dish_type: "",
        dish_description: "",
        dish_price: "",
        shelves: false,
        if_modify: true
      });
    },

    getTotalTypes: function(menu_items) {
      var totalTypes = new Set();
      for (var i = 0; i < menu_items.length; ++i) {
        var type_str = menu_items[i]["dish_type"];
        var type_arr = type_str.split(",");
        for (var j = 0; j < type_arr.length; ++j) {
          if (type_arr[j] !== "") {
            totalTypes.add(type_arr[j]);
          }
        }
      }
      return Array.from(totalTypes);
    },

    // 后台api调整
    addSync: function(row) {
      var url = 'http://localhost:5000/dish/'
      axios.post(url, {
        name: row['name'],
        price: parseFloat(row['price']),
        description: row['description'],
        imageurl: row['imageurl']
      })
        .then((response) => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.loadData()
          console.log(response)
        })
        .catch(function(err) {
          this.$message({
            type: 'success',
            message: '添加失败'
          })
          console.log(error)
        })
      // var appendUrl = "/foods";
      // var that = this;
      // this.$axios.post(appendUrl, {
      //     name: row["dish_name"],
      //     image: row["logo"],
      //     type: row["dish_type"],
      //     price: parseInt(row["dish_price"]),
      //     introduction: row["dish_description"],
      //     merchant_id: 1,
      //     in_stock: row["shelves"]
      // }).then(function(res){
      //   that.$message({
      //     type: "success",
      //     message: "添加成功!"
      //   });
      //   that.loadData();
      //   console.log(res);
      // }).catch(function(err){
      //   that.$message({
      //     type: "error",
      //     message: "添加失败!"
      //   });
      //   console.log(err);
      // });
    },

    updateSync: function(row) {
      var appendUrl = "/foods";
      var that = this;
      this.$axios.post(appendUrl, {
          food_id: row["dish_id"],
          merchant_id: 1,
          name: row["dish_name"],
          image: row["logo"],
          type: row["dish_type"],
          price: row["dish_price"],
          introduction: row["dish_description"],
          in_stock: row["shelves"]
      }).then(function(res){
        that.$message({
          type: "success",
          message: "修改成功!"
        });
        console.log(res);
      }).catch(function(err){
        that.$message({
          type: "error",
          message: "修改失败!"
        });
        console.log(err);
      });
    }
  }
};

</script>

<style scoped>
.merchant-manage {
  width: 100%;
  height: 100%;
  text-align: center;
}

.el-table th > .cell {
  text-align: center;
}

.m-table {
  text-align: center;
  margin: 0 20px;
}

.addMenuBtn {
  position: relative;
  left: 44%;
}
.imgsize
{
  width:80px;
  height:80px;
}
</style>


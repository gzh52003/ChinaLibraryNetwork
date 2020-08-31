<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-card class="listCard">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="inputInfo">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="订单编号" value="order_number"></el-option>
              <el-option label="订单价格" value="order_price"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="inputSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单表格 -->
      <el-table :data="orderList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" width="180" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.pay_status">未付款</el-tag>
            <el-tag type="success" size="mini" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" width="180" prop="create_time"></el-table-column>
        <el-table-column label="地址" width="200" prop="order_address"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot:default="scope">
            <!-- {{JSON.stringify(scope.row.order_number)}} -->
            <el-button type="primary" icon="el-icon-edit" circle @click="modifyBox(scope.row.order_number)"></el-button>
            <el-button type="success" icon="el-icon-location-outline" circle @click="showLocaltion(scope.row.order_number)"></el-button>
            <!-- 修改地址对话框 -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      
      <el-dialog
        title="修改地址"
        :visible.sync="addressDialogVisible"
        width="50%"
        @close="addressDialogClosed"
      >
        <el-form
          :model="addressForm"
          :rules="addressFormRules"
          ref="addressFormRef"
          label-width="100px"
        >
          <el-form-item label="省市区/县" prop="address1">
            <el-cascader
              v-model="addressForm.address1"
              :options="cityData"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureDialog(order_number)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 展示物流对话框 -->
        <el-dialog
          title="物流进度"
          :visible.sync="progressDialogVisible"
          width="50%">
          <!-- timeline时间线 -->
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in progressInfo"
              :key="index"
              :timestamp="item.time">
              {{item.context}}
            </el-timeline-item>
          </el-timeline>
        </el-dialog>
    </el-card>
    <router-view />
  </div>
</template>
<script>
import cityData from "./citydata.js";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orderList: [],
      addressDialogVisible: false,
      inputInfo:"",
      select:'',
      order_number:'',
      order_address1:'',
      order_address:{},
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      cityData,
      progressDialogVisible:false,
      // 物流进度
      progressInfo: [],
      order_address:'',
    };
  },
  methods: {
    async sureDialog(order_number){
      this.order_address= this.addressForm.address1 + this.addressForm.address1
      // console.log(this.order_address)
      const { data: res } = await this.$request.put("/changeAddress/"+ order_number,{["order_address"]:this.order_address});
      if(res.code === 1){
        this.$message({
            type: "success",
            message: "修改成功",
        });
      }else{
        console.log("error submit!!");
        return false;
      }
      this.orderList = [res.data];
      this.getOrderList();
      this.addressDialogVisible = false;
    },
    /* 信息匹配 */
    async inputSearch(){
      const { data: res } = await this.$request.get("/order",
      {params:{["fieldtype"]:this.select,["value"]:this.inputInfo}});
      // console.log(res);
      this.orderList = res.data;
    },
    /* 修改地址点击后状态变化 */
    async modifyBox(order_number) {
      this.addressDialogVisible = true;
      const { data: res } = await this.$request.get("/express/"+ order_number);
      // console.log(order_number);
      this.order_number = order_number;
      // console.log(this.order_number)
      this.progressInfo = res.data.data;
    },

    
    //修改地址
    showLocaltion(order_number){
      this.progressDialogVisible=true;
    },

    //获取物流信息
    async showLocaltion(order_number){
      const { data: res } = await this.$request.get("/express/"+ order_number);
      console.log(order_number);
      this.progressInfo = res.data.data;
      this.progressDialogVisible=true;
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    },
    /* 分页每页多山条信息 */
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList();
    },
    /* 当前页 */
    handleCurrentChange(val) {
      this.pageNum = val
      this.getOrderList()
    },
    /* 获取订单列表 */
    async getOrderList() {
      const { data } = await this.$request.get(`/order?pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
      this.orderList = data.data;
      // console.log(this.orderList);
      //获取长度
      const { data: res } = await this.$request.get("/order");
      this.total = res.data.length;
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="scss" scoped>
.listCard {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
.el-select .el-input {
    width: 130px;
}
.el-breadcrumb{
  margin-bottom: 15px;
}


</style>
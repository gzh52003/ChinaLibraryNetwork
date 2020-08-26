<template>
  <div>
    <!-- :data="goodslist"传入数据 -->
    <div class="title">
      <h1 class="goodslist">商品列表</h1>
      <el-button type="primary" size="small" class="addgoods" @click="addgoods()">添加商品</el-button>
    </div>
    <div class="row mt30 pl15">
      <el-button
        type="danger"
        @click="delGroup"
        size="small"
        :disabled="this.sels.length === 0"
      >批量删除</el-button>
      <!--disabled值动态显示，默认为true,当选中复选框后值为false-->
    </div>
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="书名" value="title"></el-option>
          <el-option label="作者" value="author"></el-option>
          <el-option label="出版社" value="publisher"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="goodslist"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top: 20px;margin-bottom: 20px"
      @row-click="handleCurrentChange"
      @selection-change="selsChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#" width="40" fixed></el-table-column>
      <el-table-column label="书名" prop="title" width="120"></el-table-column>
      <el-table-column prop="author" label="作者" width="110"></el-table-column>
      <el-table-column prop="url" label="图片" width="130">
        <!-- //图片 -->
        <template id="temp" v-slot:default="scope">
          <!-- vue实例外创建 -->

          <div class="demo-fit">
            <div class="block" v-for="fit in fits" :key="fit">
              <span class="title"></span>
              <el-avatar
                class="imgbackground"
                prop="scope.row.url"
                shape="square"
                :size="100"
                :fit="fit"
                :src="baseurl+scope.row.url"
              >
                <img :src="baseurl+scope.row.url" alt />
              </el-avatar>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pulishTiem" label="出版时间" width="130"></el-table-column>
      <el-table-column prop="publisher" label="出版社" width="125"></el-table-column>
      <el-table-column prop="sellPrice" label="现售价（元）"></el-table-column>
      <el-table-column prop="discount" label="折扣(折)"></el-table-column>
      <el-table-column prop="priceTit" label="原价（元）"></el-table-column>
      <el-table-column prop="kucun" label="库存（件）"></el-table-column>
      <el-table-column prop="xiaoliang" label="销量（件）"></el-table-column>
      <el-table-column prop="recoLagu" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <!-- 需要获取数据id  -->
        <slot name="title"></slot>
        <!-- 在使用elementui实际上已经将数据传给我们了，将所有的数据放在了item里 -->
        <!-- <slot :row="item" /> -->
        <!-- 作用域插槽，把上面传入的data数据里的id传过来-->
        <template v-slot:default="scope">
          <!-- plain是朴素按钮，空心的 -->
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>

          <el-button
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteGoods(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[5, 10,20,30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="sumtotal"
    ></el-pagination>
  </div>
</template>
<script>
async function shuaxin($vue, params) {
  const { data } = await $vue.$request.get("/goods", { params });
  return data;
}

export default {
  data() {
    return {
      goodslist: [],
      currentId: "",
      fits: ["fill"],
      baseurl: "",
      //分页
      currentPage1: 10,
      page: 1, //页码默认
      pageSize: 10, //一页多少条初始值
      sumtotal: 10, //总条数
      //搜索框
      input3: "",
      select: "",
      //批量删除
      sels: [], //选中的值显示
    };
  },

  methods: {
    //单个删除
    async deleteGoods(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/goods/" + id);
        // console.log(code);
        // if (data.code === 1) {
        if (data === "success") {
          //重新渲染数据
          const data = await shuaxin(this);
          this.sumtotal = data.length;
          // console.log(data);
          this.goodslist = data.filter(function (item, index) {
            return index < 10;
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },

    //分页
    //条数/页
    async handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      const data = await shuaxin(this, { val, size: this.pageSize });
      // console.log(data);
      this.goodslist = data;
    },
    async handleCurrentChange(page) {
      console.log("条目数：", this.pageSize);
      const data = await shuaxin(this, { page, size: this.pageSize });
      this.goodslist = data;
      this.baseurl = this.$baseurl + "uploads/";
    },

    goto(id) {
      // 跳转路由传参
      this.$router.push({
        name: "goodsEdit",
        params: { id },
      });
    },
    addgoods() {
      this.$router.push({
        name: "goodsAdd",
      });
    },
    //搜索
    async search() {
      console.log(this.select);
      console.log(this.input3);
      const data = await shuaxin(this, {
        ["filedtype"]: this.select,
        ["value"]: this.input3,
      });
      this.goodslist = data;
      // console.log(data);
    },
    //批量删除
    async selsChange(sels) {
      this.sels = sels;
    },
    async delGroup() {
      var ids = this.sels.map((item) => item._id).join(); //获取所有选中行的id组成的字符串，以逗号分隔

      // console.log("前端id为", ids);
      const { data } = await this.$request.delete("/goods/" + ids);
      if (data === "success") {
        //重新渲染数据
        const data = await shuaxin(this);
        this.sumtotal = data.length;
        this.goodslist = data.filter(function (item, index) {
          return index < 10;
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      }
    },
  },

  // ============================================================
  async created() {
    //拿到里面的data数据,在原型上的方法一般加个$符号
    const data = await shuaxin(this);
    this.sumtotal = data.length;
    this.goodslist = data.filter(function (item, index) {
      return index < 10;
    });
    this.baseurl = this.$baseurl + "uploads/";
  },
};
</script>
<style lang="scss">
.fenye {
  display: flex;
  justify-content: center;
}

.goodslist {
  float: left;
}
.addgoods {
  height: 30px;
  float: right;
}
.el-select .el-input {
  width: 130px;
}
.el-button--primary {
  margin-top: 15px !important;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.imgbackground {
  background: #fff !important;
}
//批量删除

.el-button--danger {
  margin-left: 10px !important;
  margin-top: 15px !important;
}
</style>

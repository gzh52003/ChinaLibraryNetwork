<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="inputValue"
        class="input-with-select"
        style="width:30%"
      >
        <el-select
          v-model="selectType"
          slot="prepend"
          placeholder="请选择"
          @change="getuserlistBytype"
        >
          <el-option label="账号" value="login"></el-option>
          <el-option label="用户名" value="username"></el-option>
          <!-- <el-option label="角色" value="role"></el-option> -->
          <!-- <el-option label="年龄" value="age"></el-option> -->
          <!-- <el-option label="性别" value="gender"></el-option> -->
          <el-option label="邮箱" value="email"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getuserlistBytype"></el-button>
      </el-input>
      <el-button type="danger" v-if="deleteShow" icon="el-icon-delete" @click="popDelete">一键删除</el-button>
      <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
        <span>确定要删除吗</span>
        <span slot="footer">
          <el-button type="primary" @click="multiDelete">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      ref="multipleTable"
      :data="userlist"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="55"></el-table-column>
      <el-table-column label="账号" prop="login" width="120"></el-table-column>
      <el-table-column prop="role" label="角色" width="120"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="220" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="120">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot>
        <slot :row="item"/>-->
        <template v-slot:default="scope">
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
            @click="deleteUser(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :current-page.sync="page"
      @current-change="getuserlistBypage"
    ></el-pagination>
  </div>
</template>
<script>
//定义一个方法掉用获取用户i二标信息
async function getUserInfoList($request, params) {
  const { data } = await $request.get("/userinfo", { params });
  console.log(data);
  let res = {};
  res.data = data.data.data.map((item) => {
    item.gender = item.gender === "m" ? "男" : "女";
    item.role = item.role === "admin" ? "管理员" : "普通用户";
    return item;
  });
  res["count"] = data.data.count;
  return res;
}
export default {
  data() {
    return {
      userlist: [],
      currentId: "",
      count: 0,
      inputValue: "",
      selectType: "",
      page: 1,
      deleteShow: false,
      dialogVisible: false,
      multipleSelection: "", //接收选中得复选框个数
    };
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/userinfo/" + id);

        if (data.code === 1) {
          let params = {};
          if (this.inputValue) {
            if (!this.selectType) this.selectType = "login";
            params["value"] = this.inputValue;
            params["typeKey"] = this.selectType;
          }
          const { data, count } = await getUserInfoList(this.$request, params);
          this.userlist = data;
          this.count = count;
          this.page = 1;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      //   this.$router.push("/user/edit/"+id + '?a=10');
      this.$router.push({
        name: "userEdit",
        params: { id },
        // query:{
        //     a:10,b:20
        // }
      });
    },
    //页面切换事件
    async getuserlistBypage(page) {
      let params = {};
      if (this.inputValue) {
        if (!this.selectType) this.selectType = "login";
        params["value"] = this.inputValue;
        params["typeKey"] = this.selectType;
      }
      params.page = page;
      const { data, count } = await getUserInfoList(this.$request, params);
      this.userlist = data;
      this.count = count;
      this.page = page;
    },
    //筛选条件
    async getuserlistBytype(texttype) {
      console.log("点击获取texttype", texttype);
      let params = {};
      if (this.inputValue) {
        if (!this.selectType) this.selectType = "login";
        params["value"] = this.inputValue;
        params["typeKey"] = this.selectType;
      }
      const { data, count } = await getUserInfoList(this.$request, params);
      this.userlist = data;
      this.count = count;
      this.page = 1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val; //选中得复选框个数
      this.deleteShow = true;
      if (this.multipleSelection.length == 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.deleteShow = false;
      }
    },
    async multiDelete() {
      console.log("删除所有选中人员");
      let checkArr = this.multipleSelection; // multipleSelection存储了勾选到的数据
      let params = [];
      let self = this;
      checkArr.forEach(function (item) {
        console.log("输出一下item : ", item);
        params.push(item._id); // 添加所有需要删除数据的id到一个数组，post提交过去
      });

      const res = await this.$request.delete("/userinfo", {
        params: { idarr: params },
      });

      // this.$http.post('/fashion/multiDelete', params).then(function (res) {
      if (res.data.code == "1") {
        self.$message({
          message: "删除成功",
          type: "success",
        });
      } else {
        self.$message({
          message: "删除失败，请联系管理员",
          type: "fail",
        });
        return;
      }
      //刷新数据
      this.dialogVisible = false;
      const { data, count } = await getUserInfoList(this.$request);
      this.userlist = data;
      this.count = count;
      this.page = 1;
    },
    popDelete() {
      this.dialogVisible = true;
    },
  },
  async created() {
    const { data, count } = await getUserInfoList(this.$request);
    this.userlist = data;
    this.count = count;
  },
};
</script>
<style lang="scss">
.el-pagination {
  padding: 30px 0 !important;
  text-align: right;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group__append button {
  background-color: #409eff !important;
}
.el-icon-search {
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #fff;
}
</style>
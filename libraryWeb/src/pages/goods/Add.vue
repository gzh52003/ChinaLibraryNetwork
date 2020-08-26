<template>
  <div>
    <h1>商品添加</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="书名" prop="title">
        <el-input v-model="ruleForm.title" @blur="addTitle"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>

      <!-- 出版时间 -->
      <el-form-item label="出版时间">
        <el-date-picker
          v-model="ruleForm.pulishTiem"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="ruleForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="现售价" prop="sellPrice">
        <el-input v-model.number="ruleForm.sellPrice"></el-input>
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-input v-model.number="ruleForm.discount"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="priceTit">
        <el-input v-model.number="ruleForm.priceTit"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="kucun">
        <el-input v-model.number="ruleForm.kucun"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="recoLagu">
        <el-input type="textarea" v-model="ruleForm.recoLagu"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addForm">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    let checksellPrice = (rule, value, callback) => {
      if (value < 1) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("填入的数字必须大于0"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };

    let validateTitle = async (rule, value, callback) => {
      const code = await this.addTitle();
      if (!"value") {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("请输入"));
      } else if (!code) {
        //说明有重复
        callback(new Error("该书已经有啦"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };

    //设置默认值
    return {
      //在这里给一个初始值，就会变成一个响应式属性。就会随着数据变化而变化
      goodsid: "",
      ruleForm: {
        title: "",
        author: "",
        pulishTiem: "",
        publisher: "",
        sellPrice: "",
        discount: "",
        priceTit: "",
        kucun: "",
        recoLagu: "",
      },
      form: {
        date1: "",
      },
      //表单的限制规则
      rules: {
        title: [
          //required: true为必填，表单change的时候触发校验
          { required: true, message: "请输入书名", trigger: "change" },
          { validator: validateTitle, trigger: "change" },
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "change" },
          {
            validator: validateTitle,
            trigger: "change",
          },
        ],
        sellPrice: [
          {
            // min: 1,
            // type: "number",
            required: true,
            message: "请输入正确的价格",
            trigger: "change",
          },
          {
            //调用checkAge规则
            validator: checksellPrice,
            trigger: "change",
          },
        ],
        discount: [
          {
            type: "number",
            // min: 1,
            required: true,
            message: "请输入折扣",
            trigger: "blur",
          },
          {
            //调用checkAge规则
            validator: checksellPrice,
            trigger: "change",
          },
        ],
        priceTit: [
          {
            // type: "number",
            required: true,
            // min: 1,
            message: "请输入正确的价格",
            trigger: "change",
          },
          {
            //调用checkAge规则
            validator: checksellPrice,
            trigger: "change",
          },
        ],
        kucun: [
          {
            type: "number",
            required: true,
            // min: 1,
            message: "请输入库存",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //添加数据并保存
    async addForm() {
      //所有的验证都通过时，才发送请求
      const { ruleForm } = this;
      // console.log("123213", ruleForm.title);

      const { data } = await this.$request.post("/goods", {
        //将ruleForm下的所有内容传入put中
        ...ruleForm,
      });
      // console.log(ruleForm);
      if (data.msg === "success") {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    },

    async addTitle() {
      const { data } = await this.$request.get(
        `/goods/check?title=${this.ruleForm.title}`
      );
      // console.log("原函数", data);
      return data.code;
    },
  },
};
</script>
<style lang="scss">
</style>
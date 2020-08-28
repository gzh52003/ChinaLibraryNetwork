<template>
  <div>
    <h1>商品{{goodsid ? '修改' : '添加'}}</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="书名" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>

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
        <el-button type="success" @click="submitForm">{{goodsid ? '修改' : '添加'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    //验证作者等的规则
    var checksellTitle = (rule, value, callback) => {
      if (!"value") {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("请输入"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };
    //验证价格的规则
    var checksellPrice = (rule, value, callback) => {
      if (value < 1) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("填入的数字必须大于0"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };

    //判断书名是否已存在
    var validateTitle = (rule, value, callback) => {
      if (value.trim() === "") {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("书名不能为空"));
      } else {
        // 发起ajax请求
        this.$request
          .get(`/goods/check?title=${this.ruleForm.title}&id=${this.goodsid}`)
          .then(({ data }) => {
            if (data.code === 0) {
              callback(new Error("书名已存在"));
            } else {
              // 规则通过后的回掉
              callback();
            }
          });
      }
    };
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
          {
            validator: validateTitle,
            trigger: "change",
          },
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "change" },
          {
            validator: checksellTitle,
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
  watch: {
    // 监听实例属性，如果有变化则执行这里的代码
    //监听是一个函数
    // 深度监听，监听ruleForm下的gender'
    // 'ruleForm.gender':function(){},以下是简写
    "ruleForm.gender"(newVal, oldVal) {
      // console.log("gender", newVal, oldVal);
    },
    //$route是当前信息
    "$route.path"(newVal, oldVal) {
      // console.log("$route change", newVal, oldVal);
      if (newVal === "/goods/add") {
        (this.goodsid = ""),
          (this.ruleForm = {
            title: "",
            author: "",
            pulishTiem: "",
            publisher: "",
            sellPrice: "",
            discount: "",
            priceTit: "",
            kucun: "",
            recoLagu: "",
          });
      }
    },
  },

  methods: {
    //修改数据并保存
    submitForm() {
      //触发校验，validate是用来校验的，valid为校验结果
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          //所有的验证都通过时，才发送请求
          const { goodsid, ruleForm } = this;

          //判断有没有goodsid
          if (goodsid) {
            //改数据
            const { data } = await this.$request.put("/goods/" + goodsid, {
              //将ruleForm下的所有内容传入put中
              ...ruleForm,
            });
            if (data.code === 1) {
              // this.$message提示信息，是elementUI、自动往原型上加的方法
              this.$message({
                type: "success",
                message: "修改成功",
              });
              //跳转到编辑页面，用name跳转
              this.$router.push({ name: "goodsList" });
            }
          } else {
            //添加数据
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
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*     async addTitle() {
      const { data } = await this.$request.get(
        `/goods/check?title=${this.ruleForm.title}`
      );
      // console.log("原函数", data);
      return data.code;
    }, */
  },

  //获取当前用户的信息，使用生命周期函数
  async created() {
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/goods/" + id);
    // console.log(data);
    this.goodsid = id;

    //将data.data合并到this.ruleForm，this.ruleForm就会被data.data覆盖
    Object.assign(this.ruleForm, data.data[0]);
    // console.log(this.ruleForm);
  },
};
</script>
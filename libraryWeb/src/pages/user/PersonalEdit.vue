<template>
  <div>
    <h1>用户编辑</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="账号" prop="login">
        <el-input type="text" v-bind:value="ruleForm.login" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="m"></el-option>
          <el-option label="女" value="f"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!-- <template v-slot:default=""> -->
          <div class="demo-type">
            <el-avatar :size="220" :src.sync="headImg" @click.native="uploadImg">
              <img :src="headImg"/>
            </el-avatar>
            <!-- <input type="text" :value="JSON.stringify(scope)"> -->
            <input type="file" name="avatar" id="avatar" style="width:0">
          </div>
        <!-- </template> -->
      </el-form-item>
      <!-- <el-form-item label="头像">
        <div class="demo-type">
          <el-avatar :size="100" :src.sync="ruleForm.headImg" @click.native="uploadImg">
            <img :src="ruleForm.headImg"/>
          </el-avatar>
          <input type="file" name="avatar" id="avatar" style="width:0">
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button type="success" @click="submitForm">提交修改</el-button>
        <el-button type="success" @click="cancel">取消/完成</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 10) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("年龄不能低于10岁"));
      }else if (value > 128) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("年龄不能高于128岁"));
      }else{
          // 规则通过后的回掉
          callback();
      }
    };
    return {
      userid: "",
      headImg:"",
      ruleForm: {
        login:"",
        username: "",
        gender: "male",
        age: "",
        email:"",
        role:"",
        baseurl:"",
        headImg:""
      },
      rules: {
        username:[
          { required: true, message: "用户名必填", trigger: "change" }
        ],
        age: [
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          // 自定义校验规则
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
            const {userid,ruleForm} = this
          const {data} = await this.$request.put("/userinfo/"+userid,{
              ...ruleForm
          });
          if(data.code === 1){
              this.$message({
                type: "success",
                message: "修改成功",
            });
          }else{
              this.$message({
                type: "success",
                message: "修改失败",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消修改
    cancel(){
      this.$router.push({name:'userList'})
    },
    uploadImg(){
      const avatar = document.querySelector("#avatar");
      avatar.click();
      const $vue = this;
      avatar.onchange=function(e){
            var formdata=new FormData(); 
            
            formdata.set("avatar" , e.target.files[0]);
            formdata.set("_id",$vue.userid)

            $vue.$request({
              url:"/upload/avatar",
              method:"post",
              data:formdata,
            }).then(res=>{
               $vue.$message({
                  type: "success",
                  message: "上传成功！",
              });
                $vue.ruleForm.headImg = $vue.$baseurl + res.data.data.headImg
                $vue.headImg = $vue.ruleForm.headImg
            }).catch(error=>{
                $vue.$message({
                  type: "success",
                  message: "上传失败！",
              });
            })
        }
    }
  },
  async created() {
   
    const {a,b} = this.$route.query;
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/userinfo/" + id);
    
    this.userid = id;
    data.data.headImg = this.$baseurl + data.data.headImg
    Object.assign(this.ruleForm, data.data);
    this.headImg = data.data.headImg

  },
};
</script>
<style lang="scss">
  .el-avatar img{
    display: block;
    // width: 100%;
    height: 100%;
  }
</style>
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="账号" prop="login">
        <el-input type="text" v-model="ruleForm.login" :disabled="isShow?true:false"></el-input>
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
        <el-select v-model="ruleForm.role":disabled="isShow?true:false">
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
          <div class="demo-type">
            <el-avatar :size="220" :src.sync="headImg" @click.native="uploadImg" id="avatarImg">
              <!-- <img src="../../public/images/avatar5.jpg"/> -->
            </el-avatar>
            <input type="file" name="avatar" id="avatar" style="width:0">
          </div>
      </el-form-item>
      <el-form-item prop="userid">
        <el-button v-if="!userid" type="success" @click="submitForm">确定添加</el-button>
        <el-button v-if="userid" type="success" @click="submitForm">提交修改</el-button>
        <el-button v-if="userid" type="success" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
export default {
  data() {
    const checkAge = (rule, value, callback) => {
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
    const checkUsername = async(rule, value, callback) => {
      var patrn=/.{2,20}$/;
          if (!patrn.exec(value)){
              return callback(new Error("只能输入2-20个的字"));
          }
          callback();
          /* const {data} = await this.$request.get("/reg/check",
              {params:{"username":value}});
          
          if (data.code === 0) {
              return callback(new Error("用户名已存在"));
          }else{
              // 规则通过后的回掉
              callback();
          } */
    };
    const checklogin = async(rule, value, callback) => {
      var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,19}$/;
          if (!patrn.exec(value)){
              return callback(new Error("只能输入2-20个以字母开头、可带数字、“_”、“.”的字串"));
          }
          console.log("this.userid",this.userid);
          const {data} = await this.$request.get("/reg/check",
              {params:{"username":value,"_id":this.ruleForm._id}});
          
          if (data.code === 0) {
              return callback(new Error("用户名已存在"));
          }else{
              // 规则通过后的回掉
              callback();
          }
    }

    return {
      isShow:"",
      userid: "",
      headImg:"",
      ruleForm: {
        _id:"",
        login:"",
        username: "",
        password:"123456",
        gender: "m",
        age: "",
        email:"",
        role:"user",
        baseurl:"",
        headImg:""
      },
      ruleFormOld:{},
      rules: {
        username:[
          { required: true, message: "用户名必填", trigger: "blur" },
          // 自定义校验规则
          {
              validator: checkUsername,
              trigger:['blur','change'],
          },
        ],
        age: [
          { required: true, message: "年龄必填", trigger: "blur" },
          { type: "number", message: "只能输入数字", trigger: "blur" },
          // 自定义校验规则
          {
            validator: checkAge,
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        login:[
          { required: true, message: '账号必填', trigger: 'blur' },
          // 自定义校验规则
          {
              validator: checklogin,
              trigger:['blur','change'],
          },
        ],
        
      },
    };
  },
  methods: {
    submitForm() {
      let gotoUpdata = true;
      this.$refs["ruleForm"].validate(async (valid) => {
        
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
            const {userid,ruleForm} = this
            if(userid){
              for(let key in this.ruleFormOld){
                if(this.ruleFormOld[key] != ruleForm[key]){
                  gotoUpdata = false;
                }
              }
              if(gotoUpdata){
                  this.$message({
                        type: "warning",
                        message: "数据没有修改不允许提交",
                    });

                    return false;
              }else{
                const {data} = await this.$request.put("/userinfo/"+userid,{
                      ...ruleForm
                  });
                  if(data.code === 1){
                      this.$message({
                        type: "success",
                        message: "修改成功",
                    });
                  // ruleForm
                  //更新本地数据
                  let user = JSON.parse(localStorage.getItem("user"))
                  Object.assign(user,ruleForm)
                  localStorage.setItem("user",JSON.stringify(user))

                  }else{
                      this.$message({
                        type: "error",
                        message: "修改失败",
                    });
                  }
              }
              
            }else{
              const {data} = await this.$request.post("/userinfo",{
                  ...ruleForm
              });
              if(data.code === 1){
                  this.$message({
                    type: "success",
                    message: "添加成功",
                });
                this.$router.replace({name:'userList'})
              }else{
                  this.$message({
                    type: "error",
                    message: "添加失败",
                });
              }
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
                // $vue.ruleForm.headImg = $vue.$baseurl + res.data.data.headImg
                $vue.headImg = ($vue.$baseurl + res.data.data.headImg);
                
                document.querySelector("#avatarImg").innerHTML = `<img src="${$vue.headImg}"/>`
                //设置本地数据
                let userinfo = JSON.parse(localStorage.getItem("user"));
                userinfo.headImg = res.data.data.headImg
                localStorage.setItem("user",JSON.stringify(userinfo));
                // debugger;
                // Vue.forceUpdate()

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
   
    const { id } = this.$route.params;
    if(id){
      const { data } = await this.$request.get("/userinfo/" + id);
      // data.data.headImg = this.$baseurl + data.data.headImg
      Object.assign(this.ruleForm, data.data);
      Object.assign(this.ruleFormOld,data.data)
      this.headImg = this.$baseurl + data.data.headImg

      this.isShow = "true"
    }
    this.userid = id;
    // debugger;
    
    if(this.$route.name === "personal"){
      console.log("打印一下数据拉",this.$route.name);
      this.isShow = "true";
      let data = JSON.parse(localStorage.getItem("user"));
      // data.headImg = this.$baseurl+ data.headImg
      this.headImg = this.$baseurl + data.headImg
      this.ruleForm = {...data}
      this.ruleFormOld = {...data};
      this.userid = data._id
    }

  },
  watch: {
    '$route.name'(newVal,oldVal){
      // console.log('$route change',newVal,oldVal);
      if(newVal === 'userAdd'){
        this.isShow = ""
        this.userid = ''
        this.headImg = ""
        this.ruleForm = {
          login:"",
          username: "",
          password:"123456",
          gender: "m",
          age: "",
          email:"",
          role:"user",
          baseurl:"",
          headImg:""
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
  .el-avatar img{
    display: block;
    // width: 100%;
    height: 100%;
    left: 0px;
  }
  .el-breadcrumb{
    margin-bottom: 15px;
  }
</style>
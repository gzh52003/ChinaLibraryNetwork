<template>
    <div class="login">
        <div class="wrap">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item>
                <!-- <div class="demo-type"> -->
                    <el-avatar :size="100" src="http://localhost:2003/uploads/avatar-1598079578699.jpg">
                        
                    </el-avatar>
                <!-- </div> -->
            </el-form-item>
            <el-form-item label="UserName" prop="username">
                <el-input type="text" v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="PassWord" prop="password">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <!-- <el-form-item class="remember">
                <el-checkbox v-model="remember">Remember Me</el-checkbox>
                <el-button type="text">Reqlster</el-button>
            </el-form-item> -->
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm">Login</el-button>
            </el-form-item>
            <el-form-item class="remember">
                <el-button type="text" @click="goto">没有账号？点此注册</el-button>
            </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
let $vue = null;
export default {
    data() {
      return {
        labelPosition: 'right',
        remember: false,
        formLabelAlign: {
          username: '',
          password: '',
          
        },
        rules:{
            username:[
                { required: true, message: "用户名必填", trigger: ['blur','change'] },
                
            ], 
            password:[
                { required: true, message: "密码必填", trigger: ['blur', 'change'] },
                
            ],
        }
      };
    },
    methods: {
        goto(){
            this.$router.push("/reg")
        },
        submitForm(){
            this.$refs["formLabelAlign"].validate(async (valid) => {
                if (valid) {
                    const {formLabelAlign} = this
                    const {data} = await this.$request.get("/login",
                    {params:{...formLabelAlign}});
                    if(data.code === 1){
                        this.$message({
                            type:"success",
                            message:"登录成功"
                        });
                        
                        //登录成功后保存cookie
                        for(let key in data.data){
                            console.log($vue.$setCookie);
                            $vue.$setCookie(key,data.data[key])
                        }
                        
                        $vue.$setCookie("token", 'true');
                        // $vue.$router
                        $vue.$router.push("/home")
                        
                    }else{
                        this.$message({
                            type:"fail",
                            message:"账号或密码错误"
                        })
                    }
                }else{
                    return false;
                }
            })
            
        }
    },
    created() {
        $vue = this;
    },
  }
</script>
<style lang="scss">
    .login{
        width: 100%;
        height: 100%;
        background: url("../../public/images/login_bg.jpg");
        position: relative;
        
    }
    .wrap{
        width: 500px;
        height: 500px;
        background: rgba(253, 250, 250,0.5);
        border: 5px solid rgba(253, 250, 250,0.5);
        margin:auto;
        position: absolute; //父元素需要相对定位
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        
        .el-form{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .el-form-item {
            margin-bottom: 0;
            display: flex;
            justify-content: center;
            width: 100%;

            // &:nth-child(2){
                margin-bottom: 22px;

            // }
            &:nth-child(1){
                .el-form-item__content{
                    width: 100px;
                }
            }
            .el-form-item__content{
                width: 60%;
            }
            .el-form-item__label{
                width: 120px !important;
                font-size: 18px;
                font-weight: 600;
            }
        }
        .el-form-item__content{
            margin-left: 0 !important;
        }
        
    }
    .remember{
        .el-form-item__content{
            width: 79% !important;
            .el-checkbox__label,.el-button{font-size: 18px;}
        }
        .el-button{
            position: absolute;
            right: 0;
        }
    }
    .btn .el-form-item__content{
        width: 79% !important;
        .el-button{
            width: 100%;
        }
    }
    .el-button--text{
        color: #606266 !important;
    }
    .el-button--text:hover{
        color:#409EFF !important
    }
    .el-avatar{
        position: relative;
        img{
            object-fit: cover;
            position: absolute;
            left: -40px;
        }
    }
</style>
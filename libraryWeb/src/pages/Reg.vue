<template>
    <div class="login">
        <div class="wrap">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item>
                <h1 style="text-align: center;">注册</h1>
            </el-form-item>
            <el-form-item label="UserName" prop="username">
                <el-input type="text" v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="PassWord" prop="password">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item class="Vcode-item" label="Vcode" prop="code">
                <el-input type="text" v-model="formLabelAlign.code"></el-input>
                <div class="vcode" @click="getVcode" id="Vcode">

                    <img src="http://localhost:2003/uploads/avatar-1598079578699.jpg" alt="">
                    <span class="vcode-span">获取验证码</span>
                </div>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm">Register</el-button>
            </el-form-item>
            <el-form-item class="remember">
                <el-button type="text" @click="goto">已有账号？点此登录</el-button>
            </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        const checkUsername = async (rule, value, callback) => {

            var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
            if (!patrn.exec(value)){
                return callback(new Error("只能输入5-20个以字母开头、可带数字、“_”、“.”的字串"));
            }
            
            const {data} = await this.$request.get("/reg/check",
                {params:{"username":value}});
            
            if (data.code === 0) {
                return callback(new Error("用户名已存在"));
            }else{
                // 规则通过后的回掉
                callback();
            }
        };
        const checkPassword = (rule, value, callback) => {
            
            let patrn=/^(\w){6,20}$/;  
                if (!patrn.exec(value)){
                    return callback(new Error("只能输入6-20个字母、数字、下划线"));
                }else{
                    // 规则通过后的回掉
                    callback();
                }
                
        };
        const checkCode = async (rule, value, callback) => {
            
            if(value.length > 3){
                const {data} = await this.$request.get("/vcode/checkCode",
                {params:{"vcode":value}});
            }else{
                return callback(new Error("请输入验证码"));
            }
            callback();
        };
      return {
        labelPosition: 'right',
        remember: false,
        formLabelAlign: {
          username: '',
          password: '',
          code:""
        },
        rules: {
            username:[
                { required: true, message: "用户名必填", trigger: ['blur','change'] },
                // 自定义校验规则
                {
                    validator: checkUsername,
                    trigger:['blur','change'],
                },
            ], 
            password:[
                { required: true, message: "密码必填", trigger: ['blur', 'change'] },
                // 自定义校验规则
                {
                    validator: checkPassword,
                    trigger: ['blur', 'change'],
                },
            ],
            // code:[
            //     { required: true, message: "验证码必填", trigger: ['blur', 'change'] },
            //     {
            //         validator: checkCode,
            //         trigger: ['blur', 'change'],
            //     },
            // ]
        }
      };
    },
    methods: {
        goto(){
            this.$router.push("/login")
        },
        submitForm() {
            this.$refs["formLabelAlign"].validate(async (valid) => {
                console.log(valid);
                // valid为校验结果，全部校验通过是值为true,否则为false
                if (valid) {
                    const {userid,formLabelAlign} = this
                    const {data} = await this.$request.post("/reg",{
                        ...formLabelAlign
                    });
                    if(data.code === 1){
                        this.$message({
                            type: "success",
                            message: "注册成功",
                        });
                    }else{
                        this.$message({
                            type: "fail",
                            message: "注册失败",
                        });
                    }

                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },
        async getVcode(){
            //点击获取验证码
            const {data} = await this.$request.get("/vcode");
            console.log(data);
            if(data.code === 1){
                console.log(1);
                document.querySelector("#Vcode").innerHTML = data.data
            }
            
        }
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
        user-select:none;
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
    .Vcode-item{
        .el-input{
            width: 60%;
        }
    }
    .vcode{
        width: 90px;
        height: 50px;
        float: right;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .vcode-span{
            cursor: pointer;
            color: green;
            font-size: 16px;
            text-align: center;
            position: absolute;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: rgba(255,255,255,0.7);
        }
    }
    
</style>
<template>
  <div class="information">
    <van-form validate-first @failed="onFailed">
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="onClickLeft"
      />

      <div class="contain">
        <van-field
          v-model="username"
          left-icon="user-o"
          placeholder="用户名/邮箱/手机号"
          :rules="[{ required:true, message: '请输入正确内容' }]"
        />
        <van-field
          v-model="password"
          type="password"
          left-icon="goods-collect-o"
          right-icon="closed-eye"
          placeholder="请输入密码"
          :rules="[{ required:true, message: '请输入密码' }]"
        />
        <div class="vcode">
          <van-field
            v-model="vcode"
            placeholder="请输入图形验证码"
            :rules="[{ required:true, message: '请输入图形验证码' }]"
          >
          </van-field>
          <van-button id="Vcode" size="small" type="default" @click="getVcode">发送验证码</van-button>
        </div>

        <van-button color="#666a6b" block class="login" @click.stop="submitForm">注册</van-button>
        <van-cell title="" value="已有账号去登录" class="register" @click="goto()" />
      </div>
    </van-form>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, NavBar, Col, Row, Grid, GridItem,Field,Form, Toast} from "vant";


Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Field);
Vue.use(Form);
Vue.use(Toast)

export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    goto(){
      this.$router.replace({name:'Login'})
    },
    async getVcode(){
      //点击获取验证码
      const {data} = await this.$request.get("/vcode");
      //console.log(data);
      if(data.code === 1){
          //console.log(1);
          document.querySelector("#Vcode").innerHTML = data.data
      } 
    },
    async submitForm() {
            // this.$refs["formLabelAlign"].validate(async (valid) => {
                // //console.log(valid);
                // valid为校验结果，全部校验通过是值为true,否则为false
                // if (valid) {
                    let params = {
                      username:this.username,
                      password:this.password,
                      vcode:this.vcode
                    }
                    const {data} = await this.$request.post("/reg",{
                        ...params
                    });
                    if(data.code === 1){
                        Toast('注册成功');
                        this.$router.replace({name:"Login"})
                    }else{
                        Toast('注册失败');
                    }

                // } else {
                // //console.log("error submit!!");
                // return false;
                // }
            // });
        },
        onFailed(errorInfo) {
          //console.log('failed', errorInfo);
        },
       async checkUsername(value, messges){
      
            var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
            //console.log("打印一下",value, messges);
            if (!patrn.exec(value)){
                return false;
            }
            
            const {data} = await this.$request.get("/reg/check",
                {params:{"username":value}});
            
            if (data.code === 0) {
                Toast('用户名已存在');
                return false;
            }else{
                // 规则通过后的回掉
                return true
            }
        },checkPassword(rule, value, callback){
            
            let patrn=/^(\w){6,20}$/;  
                if (!patrn.exec(value)){
                    return callback(new Error("只能输入6-20个字母、数字、下划线"));
                }else{
                    // 规则通过后的回掉
                    callback();
                }
                
        },async checkCode(rule, value, callback){
            //console.log(value);
            if(value.length > 3){
                const {data} = await this.$request.get("/vcode/checkCode",
                {params:{"vcode":value}});

                if(data.code !== 1)callback(new Error("请输入正确的验证码"));
            }else{
                callback(new Error("请输入验证码"));
                return
            }
            callback();
        }
  },
  data() {
    // const checkUsername = async (rule, value, callback) => {
    //   //console.log("打印一下");

    //         var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    //         if (!patrn.exec(value)){
    //             return callback(new Error("只能输入5-20个以字母开头、可带数字、“_”、“.”的字串"));
    //         }
            
    //         const {data} = await this.$request.get("/reg/check",
    //             {params:{"username":value}});
            
    //         if (data.code === 0) {
    //             return callback(new Error("用户名已存在"));
    //         }else{
    //             // 规则通过后的回掉
    //             callback();
    //         }
    //     };
    //     const checkPassword = (rule, value, callback) => {
            
    //         let patrn=/^(\w){6,20}$/;  
    //             if (!patrn.exec(value)){
    //                 return callback(new Error("只能输入6-20个字母、数字、下划线"));
    //             }else{
    //                 // 规则通过后的回掉
    //                 callback();
    //             }
                
    //     };
    //     const checkCode = async (rule, value, callback) => {
    //         //console.log(value);
    //         if(value.length > 3){
    //             const {data} = await this.$request.get("/vcode/checkCode",
    //             {params:{"vcode":value}});

    //             if(data.code !== 1)callback(new Error("请输入正确的验证码"));
    //         }else{
    //             callback(new Error("请输入验证码"));
    //             return
    //         }
    //         callback();
    //     };
    return {
      username:"",
      password:"",
      vcode:"",
      isLogin: false,
      rules:{username:[
                { required: true, message: "用户名必填", trigger: 'onBlur',validator: this.checkUsername },
                
            ], 
            password:[
                { required: true, message: "密码必填", trigger: 'onBlur' },
                // 自定义校验规则
                // {
                //     validator: checkPassword,
                //     trigger: ['blur', 'change'],
                // },
            ],
            code:[
                { required: true, message: "验证码必填", trigger: 'onChange' },
                // {
                //     validator: checkCode,
                //     trigger: ['blur', 'change'],
                // },
            ]}
    };
  },
  mounted() {
    this.getVcode();
  },
};
</script>
<style lang="scss">
html,
body,
.information {
  background: #f7f8fa;
  height: 100%;
}
.personal-center {
  padding: 0;
  background: rgb(255, 133, 42);
  color: #fff;
}
.userInfo {
  text-align: center;
  color: #fff;
  .van-col {
    height: 3.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      background: rgba($color: #302d2d, $alpha: 0.2);
      padding: 0.1rem 0;
      &:nth-child(1) {
        font-size: 1.2rem;
      }
      &:nth-child(2) {
        font-size: 0.7rem;
      }
    }
  }
}
.content {
  padding: 1rem;
  // position: relative;
  display: flex;
  .address {
    flex: 1;
    text-align: right;
    padding-top: 2rem;
    color: #fff;
  }
  .info {
    // position: absolute;
    padding-left: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .username {
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0;
    margin: 0;
    color: #fff;
  }
  .accType {
    font-size: 0.75rem;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}

/* 订单 */

.fuwu,
.huiyuan,
.dingdan,
.hobby {
  .van-icon-records::before,
  .van-icon-coupon-o::before,
  .van-icon-friends-o::before,
  .van-icon-star-o::before,
  .van-icon-like-o::before {
    color: sandybrown;
    font-size: 1rem;
  }
  // .van-icon-coupon-o::before{
  //   color: sandybrown;
  //   font-size: 1rem;
  // }
  .van-cell__title span {
    font-size: 1rem;
  }
  .van-cell__value span {
    font-size: 0.7rem;
  }
}
.hobby {
  margin-top: 1rem;
}

/* 订单 */
.wallet {
  text-align: center;
  padding: 1rem 0;
  // color: #fff;
  color: #646566;
  background: #fff;
  .van-col {
    height: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      padding: 0.1rem 0;
      &:nth-child(1) {
        font-size: 0.5rem;
      }
      &:nth-child(2) {
        font-size: 0.7rem;
      }
    }
  }
}
/* 服务与反馈 */
.fuwu {
  margin-top: 1rem;
}

.contain{
  margin: .5rem 1rem .5rem 1rem;
  >.van-cell{
    margin-top: 1rem;
  }
}
.vcode{
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  .van-button--small{
    height: 44px;
    font-size: 16px;
  }
  .van-cell{
    width: auto;
    
  }
}
.login{
  margin-top: 1rem;
}
.register{
  background:transparent;
}
</style>

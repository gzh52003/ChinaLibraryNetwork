<template>
  <div class="information">
    <div>
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="onClickLeft"
      />

      <div class="contain">
        <van-field
          v-model="username"
          left-icon="user-o"
          placeholder="用户名/邮箱/手机号"
        />
        <van-field
          v-model="password"
          left-icon="goods-collect-o"
          right-icon="closed-eye"
          placeholder="请输入密码"
        />
        <div class="vcode">
          <van-field
            v-model="vcode"
            placeholder="请输入图形验证码"
          >
          </van-field>
          <van-button id="Vcode" size="small" type="default" @click="getVcode()">发送验证码</van-button>
        </div>

        <van-button color="#666a6b" block class="login" @click.stop="login">登录</van-button>
        <van-cell title="" value="新用户注册" class="register" @click="gotoReg()" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
//import  from ''
import { Cell, NavBar, Col, Row, Grid, GridItem,Field,Toast} from "vant";
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';

Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Field)
Vue.use(Toast)


let $vue =null;
export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    gotoReg(){
      this.$router.push({name:'Reg'})
    },
    async getVcode(){
      //点击获取验证码
      const {data} = await this.$request.get("/vcode");
      console.log(data);
      if(data.code === 1){
          console.log(1);
          document.querySelector("#Vcode").innerHTML = data.data
      } 
    },
    async login(){
      let params = {
        username:this.username,
        password:this.password,
        vcode:this.vcode
      }
      console.log(params);
      const {data} = await this.$request.get(`/login`,{params});
      console.log(data.data);
      if(data.code != 1){
          Toast('登录失败');
      }else{
        this.$store.commit('initUserinfo',data.data);
        this.$router.push({name:"Mine"})
      }
      

    }
  },
  data() {
    return {
      username:"",
      password:"",
      vcode:"",
      isLogin: false,
    };
  },
  created() {
    $vue = this
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

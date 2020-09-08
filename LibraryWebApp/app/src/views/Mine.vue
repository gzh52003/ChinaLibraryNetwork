<template>
  <div class="information">
    <div>
      <van-cell class="personal-center">
        <div class="content">
          <van-image
            round
            width="3.7rem"
            height="3.7rem"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="info">
            <h4 class="username">老李</h4>
            <p class="accType">超级VIP用户</p>
          </div>
          <!-- 地址 -->
          <div class="address">
            <span>收货地址管理</span>
          </div>
        </div>
        <van-row class="userInfo" gutter="10">
          <van-col span="8">
            <span>39</span>
            <span>关注的商品</span>
          </van-col>
          <van-col span="8">
            <span>79</span>
            <span>关注的店铺</span>
          </van-col>
          <van-col span="8">
            <span>185</span>
            <span>浏览记录</span>
          </van-col>
        </van-row>
      </van-cell>
      <!-- 订单 -->
      <van-cell title="我的订单" value="查看全部订单 &gt;" icon="records" class="dingdan" />
      <!-- 导航 -->
      <van-grid :border="false">
        <van-grid-item icon="success" text="付款" />
        <van-grid-item icon="plus" text="待付款" />
        <van-grid-item icon="thumb-circle-o" text="待评价" />
        <van-grid-item icon="bag-o" text="退换" />
      </van-grid>
      <!-- 我的钱包 -->
      <van-cell title="我的钱包" value="&gt;" icon="coupon-o" class="dingdan" />
      <van-row class="wallet" gutter="10">
        <van-col span="6">
          <span>0.00</span>
          <span>账户余额</span>
        </van-col>
        <van-col span="6">
          <span>4</span>
          <span>优惠券</span>
        </van-col>
        <van-col span="6">
          <span>639</span>
          <span>积分</span>
        </van-col>
        <van-col span="6">
          <span>0</span>
          <span>VIP卡</span>
        </van-col>
      </van-row>

      <!-- 服务与反馈 -->
      <van-cell title="服务于反馈" value="意见反馈 &gt;" icon="star-o" class="fuwu" />
      <van-cell title="会员服务" value="会员俱乐部 &gt;" icon="friends-o" class="huiyuan" />

      <!-- 猜你喜欢 -->
      <van-cell title="会员服务" value="会员俱乐部 &gt;" icon="like-o" class="hobby" />

      <van-button color="#666a6b" block class="login" @click="goto()">退出当前账号</van-button>
    </div>
    
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, NavBar, Col, Row, Grid, GridItem,Field } from "vant";

Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Field)

export default {
  methods: {
    onClickLeft() {
      console.log("返回");
    },
    goto(){
      console.log("退出登录");
      this.$router.replace({name:'Login'});
      this.$store.commit('initUserinfo',{});
      // this.
    }
  },
  data() {
    return {
      value1:1,
      value2:2,
      sms:1,
      isLogin: false,
    };
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

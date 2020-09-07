<template>
  <div>
    <!-- 购物车 -->

    <header class="header">
      <van-row>
        <van-col span="4">
          <van-icon name="arrow-left" />
        </van-col>
        <van-col span="12" class="gwc">购物车</van-col>

        <van-col span="4" class="bj">编辑</van-col>
        <van-col span="4">
          <van-icon name="ellipsis" />
        </van-col>
      </van-row>
    </header>
    <main class="main">
      <van-card
        :price="item.sales_price"
        :title="item.goods_name"
        :thumb="item.img_url"
        v-for="item in goodslist"
        :key="item._id"
        @click-thumb="gotoDetail(item._id)"
      >
        <template #tag>
          <van-checkbox v-model="item.checked"></van-checkbox>
        </template>
        <template #price>
          <p class="price">
            <del>{{item.price}}</del>
            <span>{{item.sales_price}}</span>
            <van-stepper
              :value="item.qty"
              input-width="20px"
              button-size="20px"
              theme="round"
              async-change
              integer
              @change="changeQty(item._id,$event)"
            />
            <!-- async-change: 点击按钮时不会直接修改数量，而是根据value的值来显示 -->
          </p>
        </template>
        <template #footer>
          <van-button
            plain
            size="mini"
            type="danger"
            icon="cross"
            @click.stop="removeItem(item._id)"
          ></van-button>
        </template>
      </van-card>
      <div style="padding:10px">
        <van-button plain type="danger" size="small" @click="clearCart">清空购物车</van-button>
      </div>
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checkAll">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </template>
      </van-submit-bar>
    </main>
  </div>
</template>
<script>
import Vue from "vue";
import { Card, Step, Steps, SubmitBar, Stepper } from "vant";
//引入映射的方法
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

Vue.use(Card);
Vue.use(Step);
Vue.use(Steps);
Vue.use(SubmitBar);
Vue.use(Stepper);

export default {
  name: "Cart",
  data() {
    return {
      active: 0,
      selecteds: [],
    };
  },
  computed: {
    ...mapState({
      //（没有命名空间，映射进来的名字不一样时）
      // cartlist:'goodslist', // 等效于：cartlist()=>this.$store.state.goodslist

      // 映射模块化后的数据
      goodslist(state) {
        console.log("mapState=", state);
        //有命名空间时
        return state.cart.goodslist;
      },
    }),
    checkAll: {
      get() {
        return this.goodslist.every((item) => item.checked);
      },
      set(val) {
        this.goodslist = this.goodslist.map((item) => {
          item.checked = val;
          return item;
        });
      },
    },
    totalPrice() {
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.qty,0)*100;
      return this.$store.getters.totalPrice;

      // 添加命名空间的获取方式
      // return this.$store.getters['cart/totalPrice']
    },
  },
  methods: {
    onSubmit() {},
    gotoDetail(id) {
      this.$router.push("/goods/" + id);
    },
    // removeItem(id){
    //   this.$store.commit('remove',id)
    // },
    // clearCart(){
    //   this.$store.commit('clear')
    // },
    // ...mapMutations(['removeItem','clearCart']), //映射进来的命名一样时。 等效于上面的代码
    //有命名空间：
    /*  ...mapMutations("/cart", {
      removeItem: "remove",
      clearCart: "clear",
    }), */
    ...mapMutations({
      //有命名空间：
      // removeItem: "cart/remove",
      //没有命名空间
      removeItem: "remove",
      clearCart: "clear",
    }),
    // changeQty(id,qty){
    //   // this.$store.commit('changeQty',{_id:id,qty})
    //   this.$store.dispatch('changeQtyAsync',{_id:id,qty})
    // }
    ...mapActions({
      // changeQty:'changeQtyAsync'
      changeQty(dispatch, _id, qty) {
        dispatch("changeQtyAsync", { _id, qty });
      },
    }),
  },
  created() {
    // this.$parent.showMenu = false;
    // console.log('goodslist=',this.$store.state)

    this.$store.commit("displayTabbar", false);
  },
  beforeDestroy() {
    // this.$parent.showMenu = true;
    //  console.log('cart.destroyed',this.$parent.showMenu)
    this.$store.commit("displayTabbar", true);
  },
};
</script>
<style lang="scss" scope>
.header {
  background-color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 900;
  height: 3rem;
  box-shadow: 0px 0px 10px #d4d2d3;
  // background-color: aqua;
  .gwc {
    font-size: 1rem;
    text-align: center;
  }
  .bj {
    font-size: 0.6rem;
  }
}
.van-col {
  // border-bottom: 0.3rem solid #e60000;
  // margin-left: 0.1rem;
  height: 3rem;
  // font-size: 0.88rem;
  padding-top: 0.7rem;
  padding-left: 1.5rem;
  // margin-left: 0.5rem;
  // background-color: aqua;
}
.main {
  padding-top: 3.5rem;
}
</style>
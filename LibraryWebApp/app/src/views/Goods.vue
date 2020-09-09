<template>
  <!-- 详情页 -->
  <div>
    <header class="header">
      <van-row>
        <van-col span="4">
          <van-icon name="arrow-left" />
        </van-col>
        <van-col span="4" size="25">图书</van-col>
        <van-col span="4">评论</van-col>
        <van-col span="4">详情</van-col>
        <van-col span="4">
          <van-icon name="replay" />
        </van-col>
        <van-col span="4">
          <van-icon name="ellipsis" />
        </van-col>
      </van-row>
    </header>
    <!-- 内容 -->
    <main class="main">
      <van-image :src="data.url" @click="showBig" class="vanimg"></van-image>
      <div class="goods-info" :key="data._id">
        <h1>{{data.title}}</h1>
        <p class="recoLagu">{{data.recoLagu}}</p>
        <p class="prices">
          <span>
            <i>￥{{data.sellPrice}}</i>
            &nbsp;
            <em>({{data.discount}})</em>
          </span>
          <span>定价 ￥ {{data.priceTit}}</span>
        </p>
        <p class="author">
          <em>作者： {{data.author}} 著</em>
          <van-icon name="shopping-cart-o" @click="add2cart" />
        </p>
        <p class="publisher">出版社： {{data.publisher}}</p>
        <p class="wenxintishi">温馨提示：5折以下图书主要为出版社尾货，大部分为全新，个别图书品相8.9成新、切口有划线标记、光盘等附件不全</p>
        <!-- <van-tag plain type="primary">{{data.author}}</van-tag> -->
      </div>
      <h3>本类五星书</h3>
      <van-grid :border="false" :column-num="3" class="goodslist">
        <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
          <van-image :src="item.url" style="height:6rem" />
          <h4 style="padding-top:0.5rem">{{item.title}}</h4>
          <p class="price" style="padding-top:0.5rem">
            <span style="color:#e60000">￥{{item.priceTit}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <del>{{item.sellPrice}}</del>
          </p>
        </van-grid-item>
      </van-grid>

      <!--       <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="cartlist.length"
          @click="goto('/cart')"
        />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="add2cart" />
        <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
      </van-goods-action>-->
    </main>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Col,
  Row,
  Icon,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
} from "vant";
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ImagePreview);
export default {
  name: "Goods",
  data() {
    return {
      data: {},
      booktype: "",
      recommend: [],
    };
  },
  methods: {
    //跳回上一页
    /*     backlist() {
      let book = this.booktype;
      // this.$router.push(`/goods/${id}`)
      this.$router.back(`/list/${book}`);
      console.log(22222);
    }, */
    goto(path) {
      this.$router.push(path);
    },
    gotoDetail(id) {
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    showBig() {
      console.log(this.data.url);
      ImagePreview({
        images: [this.data.url],
        closeable: true,
      });
    },
    async getData(id) {
      let booktype = this.booktype;
      const { data } = await this.$request.get("/goods/book", {
        params: {
          booktype,
          id,
        },
      });
      this.data = data.data;
    },
    async getRecommend() {
      let booktype = this.booktype;
      const { data: recommend } = await this.$request.get("/goods/all", {
        params: {
          booktype,
          total: 0,
        },
      });
      this.recommend = recommend;
      console.log(this.recommend);
    },
    add2cart() {
      // 添加当前商品到购物车;
      // 判断当前商品是否已经存在购物车中
      // 存在：数量+1
      // 不存在：添加到购物车
      const { _id } = this.data;
      // console.log(_id);
      // // debugger;
      // console.log(this.$store.state.cart.cartList);
      
      const current = this.$store.state.cart.cartList.filter((item) => item._id === _id);
      if (current) {
        this.$store.commit("changeQty", { _id, qty: current.qty + 1 });
      } else {
        // async postCartAsync(content){
        //     const {data} = await request.post("/cart")
        //     content.commit('postCart',data)
        //     // console.log("data=", data);
        // }
        const goods = {
          ...this.data,
          qty: 1,
        };
        // console.log(1);
        // 调用mutation方法
        // postCartAsync(content);
        this.$store.commit("add", goods);
      }
    },
    buyNow() {
      // 添加当前商品到购物车，并跳转到购物车页面
      this.add2cart();
      this.$router.push("/cart");
    },
    // async postCartAsync(content){
    //         const {data} = await request.post("/cart")
    //         content.commit('postCart',data)
    //         // console.log("data=", data);
    // },
  },
  computed: {
    cartlist() {
      //模块化，调用时候加上模块
      return this.$store.state.cart.goodslist;
    },
  },
  async created() {
    let result = this.$route.params;
    console.log("result", result);
    this.booktype = result.booktype;
    let id = result.id;
    // console.log("从list传过来的id", id);
    // console.log("this.booktype", this.booktype);
    this.getData(id);
    this.getRecommend();
  },
  mounted() {
    // 控制下菜单显示
    // this.$parent.showMenu = false;
    // console.log('goods.created',this.$parent.showMenu)
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.id, from.params.id);
    if (to.params.id !== from.params.id) {
      this.getData(to.params.id);
      this.getRecommend();
    }
    next();
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
  height: 2.5rem;
  box-shadow: 0px 0px 10px #d4d2d3;
  // background-color: aqua;
}
.van-col {
  // border-bottom: 0.3rem solid #e60000;
  // margin-left: 0.1rem;
  height: 2.5rem;
  font-size: 0.88rem;
  padding-top: 0.7rem;
  padding-left: 1.5rem;
  // margin-left: 0.5rem;
  // background-color: aqua;
}
.goods-info {
  padding: 15px;
  h1 {
    font-size: 1rem;
    font-weight: bold;
  }
  .author,
  .publisher {
    height: 2rem;
    color: #333;
    font-size: 0.22rem;
    // background-size: 0.16rem 0.28rem;
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #ccc;
  }
  .author {
    display: flex;
    justify-content: space-between;
    .van-icon {
      color: #e60000;
    }
  }
}
//内容
.main {
  padding-bottom: 3.5rem;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
  padding-top: 3.5rem;
  .vanimg {
    margin: 0 auto;
  }
  .recoLagu {
    padding-top: 1rem;
    color: #333333;
    font-size: 0.2rem;
    line-height: 1rem;
    // line-height: 0.3rem;
  }
  h1 {
    padding-top: 1rem;
    // color: #333333;
    font-size: 1rem;
    font-weight: bold;
  }

  .prices {
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    span {
      i {
        font-size: 0.5rem;
        color: #e60000;
        font-weight: bold;
      }
      em {
        font-size: 0.2rem;
        color: #333333;
        margin: 0.02rem 0 0 0.15rem;
      }
    }
  }
  .wenxintishi {
    padding-top: 1rem;
    color: #e60000;
    font-size: 0.2rem;
    line-height: 1rem;
  }
  h3 {
    // padding: 0 0.2rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: #f3f3f3;
    // background: #f3f3f3;
    font-size: 0.26rem;
    color: #333333;
    margin-top: 0.3rem;
    font-weight: bold;
  }
}
.goodslist {
  h4 {
    font-size: 14px;
  }
}
</style>
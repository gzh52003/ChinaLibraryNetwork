<template>
  <div class="quanju">
    <!-- 列表页 -->

    <!-- 头部 -->
    <van-row class="heard">
      <van-col span="2" style="padding-left:10px;padding-top:15px">
        <van-icon name="arrow-left" size="25" color="#323233" @click="gotoclassify" />
      </van-col>
      <van-col span="20">
        <van-search shape="round" background="#fff" placeholder="托马斯·沃尔夫" />
      </van-col>
      <van-col span="2" style="padding-left:0px;padding-top:15px">
        <van-icon name="ellipsis" color="#323233" size="25" />
      </van-col>
    </van-row>
    <!-- 面包屑导航 -->
    <p class="bread">
      <span style="margin-right:15px">文学</span>
      <em style="margin-right:15px">></em>
      <i>中国当代小说</i>
    </p>
    <!-- 分类排序 -->
    <van-tabs>
      <van-tab title="默认">
        <div v-for="item in goodslist" :key="item._id" @click="gotogoods(item._id)">
          <van-card
            :price="item.sellPrice"
            :origin-price="item.priceTit"
            :desc="item.author+' 著 / '+item.publisher"
            :title="item.title"
            :thumb="item.url"
          >
            <template #tags style="margin-left:2rem;margin-top:2rem">
              <span class="xingxing">
                <van-rate v-model="value" allow-half size="0.5rem" />
              </span>

              <span style="margin-left:2rem;margin-top:5rem;color: #ff511c">
                <em>88</em>条评论
              </span>
            </template>
            <template #footer>
              <van-icon
                name="shopping-cart-o"
                style="margin-right:1rem"
                color="#ff511c"
                size="1rem"
              />
              <van-icon name="like-o" size="1rem" />
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="价格" @click="paixu('sellPrice')" style="height:100%">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="折扣">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="出版时间">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="销量">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="上架时间">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="销量">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="上架时间">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="销量">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
      <van-tab title="上架时间">
        <van-empty description="暂无书籍" size="20rem" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Icon, Search, Tab, Tabs, Button, Card, Rate } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Button);
Vue.use(Search);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Rate);

export default {
  name: "List",
  data() {
    return {
      recommend: [],
      goodslist: [],
      value: 3.5,
      booktype: "",
    };
  },
  methods: {
    gotoclassify() {
      this.$router.push({
        name: "Classify",
      });
    },
    gotogoods(id) {
      let booktype = this.booktype;
      this.$router.push({
        name: "Goods",
        params: {
          id,
          booktype,
        },
      });
    },
  },

  async created() {
    const { booktype } = this.$route.params;
    this.booktype = booktype;
    // console.log(booktype);
    // 列表数据
    const data = await this.$request.get("/goods/all", {
      params: { booktype },
    });
    this.goodslist = data.data;
    // console.log(this.goodslist);
  },
  mounted() {
    // 控制菜单显示
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
};
</script>
<style lang="scss" scope>
#app {
  background-color: #fff;
}
.quanju {
  background-color: #fff;
}
.bread {
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
  font-size: 0.5rem;
  border-bottom: 1px solid #ccc;
}
.van-tabs {
  border-bottom: 0.02rem solid #f3f3f3;
}
.van-field__left-icon .van-icon {
  font-size: 20px;
}
.van-field__body .van-field__control {
  font-size: 18px;
}
.heard {
  box-shadow: 0 0 10px #d4d2d3;
}
.listbtns {
  display: flex;
  justify-content: space-around;
}
.tejia {
  background-color: #fff;
  color: #000;
  width: 6rem;
}
.listbtn {
  width: 5rem;
  color: #000;
  border-radius: 0.5rem;
}
.xingxing {
  margin-right: 0.5rem;
  padding-top: 1rem;
}
</style>
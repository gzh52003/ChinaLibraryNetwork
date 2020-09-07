<template>
  <div style="height:100%">
    <!-- 分类页 -->
    <van-tree-select
      height="100%"
      style="padding-bottom:40px;border-right:2px solid #ccc"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0">
          <p style="padding-right:10px;padding-left:10px;">
            <van-image
              style="padding-top:10px"
              src="http://image31.bookschina.com/pro-images/200902kx/700263.jpg?id=2"
            />
          </p>
          <!-- 两张图片 -->
          <van-row style="padding-top:5px;padding-right:10px;padding-left:10px;">
            <van-col span="12">
              <van-image style="margin-right:0.5rem;height:50px" src="images/lei_xsj.png" />
            </van-col>
            <van-col span="12">
              <van-image style="height:50px;margin-left:0.5rem;" src="images/lei_cxb.png" />
            </van-col>
          </van-row>
          <!-- 渲染 -->
          <van-grid :border="false" :column-num="3">
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s8078919.jpg" />
              <span>动漫卡通</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('gushici')">
              <van-image style="padding-bottom:0.5rem" src="images/s8185635.jpg" />
              <span>古诗词</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('shehuikexue')">
              <van-image style="padding-bottom:0.5rem" src="images/s5072978.jpg" />
              <span>社会科学</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('yishulilun')">
              <van-image style="padding-bottom:0.5rem" src="images/s6640927.jpg" />
              <span>艺术理论</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('yishulilun')">
              <van-image style="padding-bottom:0.5rem" src="images/s7408987.jpg" />
              <span>中国当代...</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('yishulilun')">
              <van-image style="padding-bottom:0.5rem" src="images/s8236790.jpg" />
              <span>中国古典...</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s7474127.jpg" />
              <span>中国近代...</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s8138579.jpg" />
              <span>外国小说...</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s8138212.jpg" />
              <span>财经</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s6788162.jpg" />
              <span>都市</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('dongmankatong')">
              <van-image style="padding-bottom:0.5rem" src="images/s8182384.jpg" />
              <span>官场</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('gushici')">
              <van-image style="padding-bottom:0.5rem" src="images/s8138212.jpg" />
              <span>都市</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('gushici')">
              <van-image style="padding-bottom:0.5rem" src="images/s8185976.jpg" />
              <span>都市</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('gushici')">
              <van-image style="padding-bottom:0.5rem" src="images/s8187287.jpg" />
              <span>都市</span>
            </van-grid-item>
            <van-grid-item @click="gotolist('gushici')">
              <van-image style="padding-bottom:0.5rem" src="images/s8185976.jpg" />
              <span>都市</span>
            </van-grid-item>
          </van-grid>
        </div>
        <div v-if="active === 1">
          <van-empty description="暂无书籍" />
        </div>
        <div v-if="active === 2">
          <van-empty description="暂无书籍" />
        </div>
        <div v-if="active === 3">
          <van-empty description="暂无书籍" />
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import { TreeSelect, Tab, Tabs, Empty } from "vant";
Vue.use(TreeSelect);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Empty);
export default {
  name: "Classify",
  data() {
    return {
      active: 0,
      items: [
        { text: "文学" },
        { text: "社科" },
        { text: "少儿" },
        { text: "艺术" },
      ],
    };
  },
  methods: {
    gotolist(booktype) {
      this.$router.push({
        name: "List",
        params: {
          booktype: booktype || "",
        },
      });
    },
  },
};
</script>
<style lang="scss" scope>
html,
body,
#app {
  background-color: #f3f3f3;
  height: 100%;
}

.van-tree-select__content {
  flex: 3;
}
</style>
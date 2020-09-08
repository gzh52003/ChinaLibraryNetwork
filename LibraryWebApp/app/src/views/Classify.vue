<template>
<<<<<<< HEAD
  <div style="height:100%">
    <!-- 分类页 -->
    <header>
      <van-row>
        <van-col span="8">
          <h1>
            <img src="images/logo1.png" alt="中国图书网" />
          </h1>
        </van-col>
        <van-col span="13" class="heatitle">
          <van-cell-group>
            <van-field @focus="searchInput()" class="searchInput" placeholder="自卑与超越" />
          </van-cell-group>
        </van-col>
        <van-col span="3">
          <van-icon
            class="search"
            name="search"
            color="#ccc"
            size="1.5rem"
            style="padding-top:0.8rem"
          />
        </van-col>
      </van-row>
    </header>
    <van-tree-select
      height="100%"
      style="padding-bottom:5rem"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0">
          <p style="padding-right:10px;padding-left:10px;">
            <van-image style="padding-top:10px" src="images/7002631.jpg" />
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
          <van-empty description="暂无书籍" style="padding-top:9rem" />
        </div>
        <div v-if="active === 2">
          <van-empty description="暂无书籍" style="padding-top:9rem" />
        </div>
        <div v-if="active === 3">
          <van-empty description="暂无书籍" style="padding-top:9rem" />
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import {
  TreeSelect,
  Tab,
  Tabs,
  Empty,
  Col,
  Row,
  Icon,
  Cell,
  CellGroup,
} from "vant";
Vue.use(TreeSelect);

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(Col);
Vue.use(Row);
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
</script scope>
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
header {
  height: 52px;
  background: #e60000;
  .van-row {
    height: 52px;
    .van-col {
      height: 52px;
      h1 {
        position: absolute;
        left: 0;
        top: 0;
        height: 36px;
        margin-top: 8px;
        img {
          height: 36px;
        }
      }
    }
  }
}
.van-hairline--top-bottom {
  height: 36px;
  margin-top: 8px;
  border-radius: 36px;
  line-height: 36px;
}
.search {
  font-size: 30px;
  padding-top: 11px;
  margin-left: 10px;
}
.van-field {
  height: 36px;
  padding: 0px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 36px;
}
.van-field__body {
  text-indent: 12px;
  border-radius: 36px;
}
.heatitle {
  position: absolute;
  top: 0;
  left: 8rem;
}
.van-field__control {
  margin-left: 2rem;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  /* margin: 0; */
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
</style>
=======
  <div>
    Classify
  </div>
</template>
<script>

</script>
>>>>>>> c64e7f61e861b8e029b3d6daeee1390ff4d1f983

<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" active-color="#e60000" route>
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Button,
  Tabbar,
  TabbarItem,
  Tag,
  Image,
  ImagePreview,
  Field,
  Checkbox,
  Col,
  Row,
} from "vant";
Vue.use(Image);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(Row);
export default {
  data() {
    return {
      active: 0,
      // showMenu:true,
      menu: [
        {
          name: "home",
          path: "/home",
          icon: "wap-home-o",
          text: "首页",
        },
        {
          name: "classify",
          path: "/classify",
          icon: "orders-o",
          text: "分类",
        },
        {
          name: "service",
          path: "/service",
          icon: "service-o",
          text: "客服",
        },
        {
          name: "cart",
          path: "/cart",
          icon: "shopping-cart-o",
          text: "购物车",
        },
        {
          name: "mine",
          path: "/mine",
          icon: "user-o",
          text: "我的",
        },
      ],
    };
  },
  computed: {
    // cartLength(){
    //   return this.$store.state.cart.goodslist.length
    // },
    // showTabbar(){
    //   return this.$store.state.common.showTabbar
    // }
  },
  created() {
    // this.$store.dispatch('getCart');
    console.log(this.$store);
  },
};
</script>
<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  font-family: Microsoft Yahei, Helvetica, Arial;
  font-size: 12px;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #333;
}
input {
  outline: none;
}
img {
  vertical-align: top;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear_fix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

html,
body,
#app {
  height: 100%;
}
</style>


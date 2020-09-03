<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active" active-color="#e60000" route>
      <van-tabbar-item  :icon="item.icon" v-for="item in menu" :key="item.name" :to="item.path">{{item.text}}</van-tabbar-item>
  </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import {Button,Tabbar, TabbarItem,Tag, Image, ImagePreview, Field, Checkbox } from 'vant'
Vue.use(Image);
Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Field);
Vue.use(Checkbox)
export default {
  data(){
    return {
      active:0,
      // showMenu:true,
      menu:[{
        name:'home',
        path:'/home',
        icon:'wap-home-o',
        text:'首页'
      },
      {
        name:'classify',
        path:'/classify',
        icon:'orders-o',
        text:'分类'
      },
      {
        name:'service',
        path:'/service',
        icon:'service-o',
        text:'客服'
      },
      {
        name:'cart',
        path:'/cart',
        icon:'shopping-cart-o',
        text:'购物车'
      },{
        name:'mine',
        path:'/mine',
        icon:'user-o',
        text:'我的'
      }]
    }
  },
  computed:{
    // cartLength(){
    //   return this.$store.state.cart.goodslist.length
    // },
    // showTabbar(){
    //   return this.$store.state.common.showTabbar
    // }
  },
  created(){
    // this.$store.dispatch('getCart');
    console.log(this.$store)
  }
}
</script>
<style lang="scss">
.price {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
</style>


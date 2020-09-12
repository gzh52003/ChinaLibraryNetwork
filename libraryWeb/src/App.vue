<template>
  <el-container style="height:100%" v-cloak>
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo" style="height: 60px;">
          <i>
            <img src="../public/images/logo.png" alt="">
          </i>
          <span>中国图书网后台管理系统</span>
        </el-col>
        <el-col :span="12" style="text-align:right;height: 60px;">
          <el-avatar :size="50" style="vertical-align: top;margin-top:5px;margin-right:10px" :src="avatar">
            <img :src="avatar" alt="头像">
          </el-avatar>
          <span style="font-size: 16px;margin-right: 20px;vertical-align: bottom;display: inline-block;height: 42px;">{{userinfo.roleName}}-{{userinfo.username}}</span>
          <el-button style="vertical-align: bottom;" class="cancella" type="text" @click="cancellation" >注销</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          @select="changeMenu"
          active-text-color="#409EFF"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <el-submenu :key="item.path" :index="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>
              <el-menu-item
                :key="sub.path"
                :index="item.path + sub.path"
                v-for="sub in item.submenu"
              >
              <i :class="sub.icon" style="color:#fff"></i>
              {{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="padding:0px 0;">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userinfo:{},
      avatar:"",
      activeIndex: "/home",
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户列表",
              path: "/list",
              icon:"el-icon-menu"
            },
            {
              text: "添加用户",
              path: "/add",
              icon:"el-icon-menu"
            },
          ],
        },
        {
          text: "权限管理",
          path: "/power",
          icon: "el-icon-copy-document",
          submenu: [
            {
              text: "角色列表",
              path: "/roles",
              icon: "el-icon-menu",
            },
            {
              text: "权限列表",
              path: "/list",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-goods",
          submenu: [
            {
              text: "商品列表",
              path: "/list",
              icon: "el-icon-menu",
            },

            {
              text: "商品添加",
              path: "/add",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "订单列表",
              path: "/list",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          text: "个人中心",
          path: "/personal",
          icon: "el-icon-s-order"
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    goto(path, idx) {
      console.log(this.$router);
      this.$router.push(path);
      // this.$router.replace(path);
      this.currentIndex = idx;
    },
    back() {
      this.$router.back();
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
    cancellation(){
      localStorage.removeItem("user")
      this.$router.push("/login")
    }
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem("user"));
    this.avatar = this.$baseurl+ this.userinfo.headImg
    // console.log(this.userinfo);
  },
  components: {},
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.header {
  line-height: 40px;
  color: #fff;
  background-color: rgba(84, 92, 100, 0.9);
  .logo {
    font-size: 24px;
    color: #fff;
    i {
      font-size: 40px;
      vertical-align: middle;
      margin-right: 5px;
      img {
        margin: 3px;
      }
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}

[v-cloak] {
    display: none !important;
}
.cancella>span{
  color: #fff;
  font-size: 16px;
}
.el-avatar{
  position: relative;
  img{
    position: absolute;
    left: 0;
  }
}
</style>

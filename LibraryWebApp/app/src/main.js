import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'

// 全部引入
// import Vant from 'vant'
// import 'vant/lib/index.css';
// Vue.use(Vant);

// 按需引入
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
// console.log('Button',Button)
// Vue.use(Button);

// 利用工具实现按需引入
// babel-plugin-import

Vue.config.productionTip = false
Vue.prototype.$request = request;
const vm = new Vue({
  router,
  store,
  render: h => h(App)
});
vm.$mount('#app')

router.beforeEach(async (to, from, next) => {

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    
      let user = vm.$store.state.Login.userinfo||{};
      console.log(user);
      // debugger;
      
      //把token发送给后端，校验token是否正确
      if(!user.authorization) next({path: '/login'});
      else{ // 判断本地是否存在token
          const {data} = await vm.$request.get("/jwtverify",{
              params:{
                  authorization:user.authorization
              }
          })
          console.log("验证token值：",data);
          //把数据保存到store状态中
          // vm.$store.commit('initUserinfo',data.data);
          if(data.code === 1)next();
          else next({path: '/login'});
      }
    
  } else {
    next();
  }
});

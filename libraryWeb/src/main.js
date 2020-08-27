import Vue from 'vue'
import ElementUI from 'element-ui'
// import App from './App.vue'
import manage from './components/manage.vue'
import router from './router'
import request from './utils/request';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request
Vue.prototype.$baseurl = "http://localhost:2003";
new Vue({
  // 把router注入Vue实例
  router,
  render: h => h(manage),
}).$mount('#app')

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
Vue.prototype.$setCookie = function (key,value,t=1000*60*60*60*2){
  let oDate=new Date();
  oDate.setDate(oDate.getDate()+t);
  document.cookie=key+"="+value+"; expires="+oDate.toDateString();
}
Vue.prototype.$getCookie = function (key){
  let arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for(let i=0;i<arr1.length;i++){
        let arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}

new Vue({
  // 把router注入Vue实例
  router,
  render: h => h(manage),
}).$mount('#app')

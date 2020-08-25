import Vue from 'vue';

// 1. 引入Vue-Router
import VueRouter from 'vue-router'

//后台模板
import App from '../App.vue'

import Home from '../pages/Home.vue'
import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'
import PersonalEdit from '../pages/user/PersonalEdit.vue'
import Power from '../pages/power/Default.vue'
import PowerList from '../pages/power/List.vue'
import PowerRoles from '../pages/power/Roles.vue'
import Order from '../pages/order/Default.vue'
import OrderList from '../pages/order/List.vue'
import Goods from '../pages/goods/Default.vue'
import GoodsList from '../pages/goods/List.vue'
import GoodsAdd from '../pages/goods/Add.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'



// 2. 使用VueRouter
Vue.use(VueRouter)
// 3. 实例化并配置参数
const router = new VueRouter({
    // mode:'history', // 一般上线后改为history路由(需要额外配置服务器)
    routes: [
        
        {
            path: '/', // /->/home
            redirect: '/home'
        },
        {
            path: '/',
            component: App,
            children: [
                // 进入用户管理页面直接跳到用户列表
                {
                    path: '',
                    redirect: 'home'
                },
                {
                    path: '/home',
                    component: Home
                }, 
                {
                    path: '/user',
                    component: User,
                    children: [
                        // 进入用户管理页面直接跳到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'add',
                            component: UserAdd
                        }, {
                            name:'userList',
                            path: 'list',
                            component: UserList
                        }, {
                            name:'userEdit',
                            path: 'edit/:id',
                            component: UserEdit
                        }]
                },
                {
                    path: '/power',
                    component: Power,
                    children: [
                        // 进入用户管理页面直接跳到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'list',
                            component: PowerList
                        }, {
                            path: 'roles',
                            component:  PowerRoles
                        }]
                    
                },
                {
                    path: '/order',
                    component: Order,
                    children: [
                        // 进入用户管理页面直接跳到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'list',
                            component: OrderList
                        }]
                },
                {
                    path: '/goods',
                    component: Goods,
                    children: [
                        // 进入用户管理页面直接跳到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'add',
                            component: GoodsAdd
                        }, {
                            path: 'list',
                            component: GoodsList
                        }]
                    
                }]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/reg',
            component: Reg
        },{
            name:'personal',
            path:'/personal',
            component: PersonalEdit

        },
        {
            path: '/404',
            component: NotFound
        },
        // 404页面效果
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

export default router;

console.log('router=', router);
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
import GoodsEdit from '../pages/goods/Edit.vue'
// import GoodsAdd from '../pages/goods/Add.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import $request from '../utils/request'



// 2. 使用VueRouter
Vue.use(VueRouter)
// 3. 实例化并配置参数
const router = new VueRouter({
    mode:"history",
    // mode:'history', // 一般上线后改为history路由(需要额外配置服务器)
    routes: [

        {
            path: '/',
            redirect: '/home',

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
                    component: Home,
                    meta: {
                        requireAuth: true
                    },
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
                            name:"userAdd",
                            path: 'add',
                            component: UserEdit,

                            meta: {
                                requireAuth: true
                            },
                        }, {
                            name: 'userList',
                            path: 'list',
                            component: UserList,
                            meta: {
                                requireAuth: true
                            },
                        }, {
                            name: 'userEdit',
                            path: 'edit/:id',
                            component: UserEdit,
                            meta: {
                                requireAuth: true
                            },
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
                            component: PowerList,
                            meta: {
                                requireAuth: true
                            }
                        }, {
                            path: 'roles',
                            component: PowerRoles,
                            meta: {
                                requireAuth: true
                            }
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
                            component: OrderList,
                            meta: {
                                requireAuth: true
                            }
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
                            name: 'goodsAdd',
                            path: 'add',
                            component: GoodsEdit,
                            meta: {
                                requireAuth: true
                            }
                        }, {
                            name: 'goodsEdit',
                            path: 'edit',
                            component: GoodsEdit,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            name: 'goodsList',
                            path: 'list',
                            component: GoodsList,
                            meta: {
                                requireAuth: true
                            }
                        }]

                }, {
                    name: 'personal',
                    path: '/personal',
                    component: UserEdit,
                    meta: {
                        requireAuth: true
                    }

                }]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/reg',
            component: Reg
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
router.beforeEach(async (to, from, next) => {

    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        let user = localStorage.getItem("user")||{};
        try {
            user = JSON.parse(user);
        } catch (error) {
            user = {};
        }
        //把token发送给后端，校验token是否正确
        if(!user.authorization) next({path: '/login'});
        else{ // 判断本地是否存在token
            const {data} = await $request.get("/jwtverify",{
                params:{
                    authorization:user.authorization
                }
            })
            console.log("验证token值：",data);
            if(data.code === 1)next();
            else next({path: '/login'});
        }
      
    } else {
      next();
    }
});

console.log('router=', router);
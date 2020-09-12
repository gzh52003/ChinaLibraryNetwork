/* 
import request from '../utils/request'
import {Notify} from 'vant'

const cart = {
    // 添加命名空间
    // namespaced:true,
    // 共享的数据：类似组件中的data
    state:{
        goodslist:[]
    },
    getters:{
        test(){
            return 'cart'
        }
    },
    mutations:{
        
    },

    actions:{

    }
}

export default login; */

import request from '../utils/request'
import {Notify} from 'vant'

const login = {
    state:{
        userinfo:{}
    },
    // getters:{
    //     test(){
    //         return 'cart'
    //     }
    // },
    mutations:{
        initUserinfo(state,data){
            state.userinfo = data;
        },
    },
    actions:{
        //异步请求
        async login(context,params){
            const {data} = await request.get(`/login`,{params});
            context.commit('initUserinfo',data.data)
        },
        
    }
}
export default login;
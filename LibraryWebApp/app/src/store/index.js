import Vue from 'vue';
import Vuex from 'vuex';
import common from './common'
import cart from './cart'
import Login from './Login'



Vue.use(Vuex);

const store = new Vuex.Store({
    // store模块化
    modules:{
        common,
        cart,
	    Login
    }
})

export default store;
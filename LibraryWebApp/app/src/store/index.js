import Vue from 'vue';
import Vuex from 'vuex';
//引入store模块
import cart from './cart'
import common from './common'

Vue.use(Vuex);

const store = new Vuex.Store({
    // store模块化
    modules: {
        cart,
        common,
    }
})

export default store;
// 全局配置
const common = {
    state: {
        showTabbar: true
    },
    getters: {
        test() {
            return 'common';
        }
    },
    mutations: {
        //让下边栏隐藏，payload为布尔值，看传过来的是什么
        displayTabbar(state, payload) {
            state.showTabbar = payload;
        }
    },
    actions: {

    }
}

export default common;
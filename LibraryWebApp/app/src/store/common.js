const common = {
    state:{
        showTabbar:true
    },
    getters:{
        test(){
            return 'common';
        }
    },
<<<<<<< HEAD
    mutations: {
        //让下边栏隐藏，payload为布尔值，看传过来的是什么
        displayTabbar(state, payload) {

=======
    mutations:{
        displayTabbar(state,payload){
>>>>>>> c64e7f61e861b8e029b3d6daeee1390ff4d1f983
            state.showTabbar = payload;
        }
    },
    actions:{

    }
}

export default common;

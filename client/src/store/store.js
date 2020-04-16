import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
    username: '',
    friend: '',
}
const mutations={
    
}

const getters={
    getUsername(state){
        return sessionStorage.getItem('user') || '';
    },
    getFriend(state){
        return sessionStorage.getItem('friend') || '';
    }
}

const actions={

}

const store=new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store;

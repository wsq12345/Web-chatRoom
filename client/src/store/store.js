import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
    username: '',
    chating: '群聊',
}
const mutations={
    getChating(state,chat){
        state.chating=chat;
    }
}

const getters={
    getUsername(state){
        return sessionStorage.getItem('user') || '';
    },
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

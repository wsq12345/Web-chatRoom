import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
    username: '',
    charting: '群聊',
}
const mutations={
    getCharting(state,chart){
        state.charting=chart;
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

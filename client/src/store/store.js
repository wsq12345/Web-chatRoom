import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '../api/api'
Vue.use(Vuex);
const state={
    username: '',
    friend: '',
    type: '',
    info:{
        username:'',
        picUrl:'',
        registerTime:''
    }
}
const mutations={
    setInfo(state,data){
        state.info.username=data.username;
        state.info.picUrl=data.picUrl;
        state.info.registerTime=new Date(data.registerTime).toLocaleDateString();
    },
    clearInfo(state){
        for(var key in state.info){
            state.info[key]='';
        }
    }
}

const getters={
    getUsername(state){
        return sessionStorage.getItem('user') || '';
    },
    getFriend(state){
        return sessionStorage.getItem('friend') || '';
    },
    getType(state){
        return sessionStorage.getItem('type');
    }
}

const actions={
    async getUserInfo({state,commit},data){
        const result=await getUserInfo(data);
        commit('setInfo',result.data);
    },
    async delInfo({state,commit}){
        setTimeout(commit('clearInfo'),5);
    }
}

const store=new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store;

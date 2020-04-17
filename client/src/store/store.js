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
        state.info.registerTime=data.registerTime;
    },
    clearInfo(state){
        state.info.username='';
        state.info.picUrl='';
        state.info.registerTime='';
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
    }
}

const store=new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store;

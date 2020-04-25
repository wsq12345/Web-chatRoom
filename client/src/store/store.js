import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '../api/api'
Vue.use(Vuex);
const state={
    user: {
        name: '',
        uid: '',
        picUrl: '',
    },
    friend: '',
    type: '',
    chating: '群聊',
    info:{
        username:'',
        picUrl:'',
        registerTime:''
    }
}
const mutations={
    setUser(state,data){
        state.user.name=data.name;
        state.user.uid=data.uid;
        state.user.picUrl=data.picUrl;
    },
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
}

const actions={
    async getUserInfo({state,commit},data){
        const params = new URLSearchParams();
        params.append('username',data);
        const result=await getUserInfo(params);
        return new Promise((resolve,reject)=>{
            resolve(commit('setInfo',result.data));
        })
    },
    async delInfo({state,commit}){
        return new Promise((resolve,reject)=>{
            resolve(commit('clearInfo'));
        })
    }
}

const store=new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store;

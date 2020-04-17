<template>
    <div>
        <headerGuide msg="搜索"></headerGuide>
        <div style="height:40px"></div>
        <el-input placeholder="请输入内容" v-model="input">
            <el-button slot="append" icon="iconfont icon-search" @click="search"></el-button>
        </el-input>
        <ul>
            <li v-for="(friend,index) in friends" :key="index" class="friendList" @click="showDetail(index)">
                <img :src="friend.picUrl" class="pic"><div class="name">{{friend.username}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import {searchFriend} from '../api/api'
export default {
    data(){
        return{
            input: '',
            friends: []
        }
    },
    methods:{
        async search(){
            const params = new URLSearchParams();
            params.append('friend',this.input);
            let data = await searchFriend(params);
            for(var i=0;i<data.data.length;i++){
                this.friends.push(data.data[i]);
            }        
        },
        showDetail(index){
            sessionStorage.setItem('friend',friends[index].username);
        }
    },
    components:{
        headerGuide
    }
}
</script>

<style lang="less">
    .friendList{
        float: left;
        width: 30%;
        margin-right: 3%;
        .pic{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                float: left;
            }
        .name{
            margin-left: 0.5rem;
            display: inline-block;
            line-height: 50px;
            font-size: 1.5rem;
        }
    }
</style>
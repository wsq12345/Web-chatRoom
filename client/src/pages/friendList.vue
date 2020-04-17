<template>
    <div>
        <headerGuide msg="好友"></headerGuide>
        <div style="height:40px"></div>
        <ul>
            <li v-for="friend in friends" :key="friend.index">
                <img :src="friend.picUrl" class="pic"><div class="name">{{friend.username}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import { friendRequestaddFriend } from '../api/api'
export default {
    data(){
        return{
            friends:[]
        }
    },
    methods:{
        async show(){
            const params = new URLSearchParams();
            params.append('username')
            let result = await friendRequest(params);
            for(var i=0;i<result.length;i++){
                let username=result.data[i].username;
                await this.$store.dispatch('getUserInfo',username);
                this.friends.push(this.$store.info);
                this.$store.commit('clearInfo')
            }      
        }
    },
    mounted(){
        this.show();
    },
    components:{
        headerGuide
    }
}
</script>

<style lang="less" scoped>
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
</style>
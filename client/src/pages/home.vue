<template>
    <div>
        <headerGuide msg="消息"></headerGuide>
        <div style="height:40px"></div>
        <ul class="message">
            <li v-for="(item,index) in items" :key="item.index" @click="chat(index)">
                <img :src="item.picUrl" class="pic"><div class="name">{{item.username}}</div>
            </li>
        </ul>
        <div class="foot"></div>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import { getFriendList,getUserInfo } from '../api/api'
export default {
    data(){
        return{
            items:[{username:'群聊',picUrl:'http://127.0.0.1:3000/public/image/touxiang.jpg'}]
        }
    },
    mounted(){
        this.show();
    },
    methods:{
        chat(index){
            sessionStorage.setItem('route',this.$route.path);
            sessionStorage.setItem('friend',JSON.stringify({
                name: this.items[index].username,
                uid: this.items[index].uid,
                type: this.items[index].username=='群聊'?0:1
            }));
            this.$router.replace('/chatRoom');
        },
        async show(){
            const params = new URLSearchParams();
            let user = sessionStorage.getItem('user');
            params.append('username',JSON.parse(user).name);
            let result = await getFriendList(params);
            if(result=='error')
                return;
            for(var i=0;i<result.data.length;i++){
                let friend = result.data[i].friend;
                const params = new URLSearchParams();
                params.append('username',friend);
                let data = await getUserInfo(params);
                this.items.push(data.data);
            }
        }
    },
    components:{
        headerGuide
    },
}
</script>

<style lang="less">
    .message{
        li{
            margin-bottom: 1rem;
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
        
    }
    .foot{
        height: 3rem;
    }
</style>
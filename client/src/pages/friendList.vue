<template>
    <div>
        <headerGuide msg="好友"></headerGuide>
        <div style="height:40px"></div>
        <div class="request">
            请求列表
        </div>
        <ul>
            <li v-for="(friend,index) in friendRequest" :key="index" @click="showBox(index)">
                <img :src="friend.picUrl" class="pic"><div class="name">{{friend.username}}</div>
            </li>
        </ul>
        <div class="friendList">
            好友列表
        </div>
        <ul>
            <li v-for="(friend,index) in friendList" :key="index" @click="showDetail(index)">
                <img :src="friend.picUrl" class="pic"><div class="name">{{friend.username}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import { addFriend,getFriendList,getUserInfo } from '../api/api'
export default {
    data(){
        return{
            friendRequest:[],
            friendList:[]
        }
    },
    methods:{
        async show(){
            const params = new URLSearchParams();
            let user = sessionStorage.getItem('user');
            params.append('username',user);
            let result = await getFriendList(params);
            if(result=='error')
                return;
            for(var i=0;i<result.data.length;i++){
                let username=result.data[i].username;
                let friend = result.data[i].friend;
                const params = new URLSearchParams();
                if(result.data[i].status==1){
                    params.append('username',friend);
                    let data = await getUserInfo(params);
                    this.friendList.push(data.data);
                }else{
                    params.append('username',username);
                    let data = await getUserInfo(params);
                    this.friendRequest.push(data.data);
                }
                
            }
        },
        showBox(index){
            this.$confirm('您是否同意此好友请求?', '提示', {
                confirmButtonText: '接受',
                cancelButtonText: '拒绝',
                type: 'warning'
            }).then(() => {
                this.add(index,1);
                this.friendList.push(this.friendRequest[index]);
                this.friendRequest.splice(index,1);
            }).catch(() => {
                this.add(index,-1);
                this.friendRequest.splice(index,1);       
            });
        },
        async add(item,status){
            let param = new URLSearchParams();
            param.append('username',sessionStorage.getItem('user'));
            param.append('friend',this.friendRequest[item].username);
            param.append('status',status);
            let result = await addFriend(param);
            if(result!='error')
                this.$message.success(result.data.msg);
        },
        showDetail(index){
            sessionStorage.setItem('friend',this.friendList[index].username);
            sessionStorage.setItem('route',this.$route.path);
            this.$router.replace('/detail');
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
    .friendList,.request{
        font-size: 1.5rem;
        color: crimson;
        opacity: 0.4;
        margin-top: 1rem;
    }
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
<template>
    <div>
        <headerGuide msg="好友"></headerGuide>
        <div style="height:40px"></div>
        <div class="request" @click="showRequest()">
            <i class="iconfont" :class="[requestShow?'icon-xiajiantou':'icon-iconfontjiantou5']"></i> 请求列表
        </div>
        <ul class="list">
            <li v-for="(friend,index) in friendRequest" :key="index" @click="showBox(index)" v-show="requestShow">
                <img :src="friend.picUrl" class="pic"><div class="name">{{friend.username}}</div>
            </li>
        </ul>
        <div class="friendList" @click="showFriend()">
            <i class="iconfont" :class="[friendShow?'icon-xiajiantou':'icon-iconfontjiantou5']"></i> 好友列表
        </div>
        <ul class="list">
            <li v-for="(friend,index) in friendList" :key="index" @click="showDetail(index)" v-show="friendShow">
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
            friendList:[],
            friendShow: false,
            requestShow: false
        }
    },
    methods:{
        async show(){
            const params = new URLSearchParams();
            let user = sessionStorage.getItem('user');
            params.append('username',JSON.parse(user).name);
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
            sessionStorage.setItem('friends',this.friendList[index].username);
            sessionStorage.setItem('route',this.$route.path);
            this.$router.replace('/detail');
        },
        showFriend(){
            this.friendShow = this.friendShow==true?false:true;
        },
        showRequest(){
            this.requestShow = this.requestShow==true?false:true;
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
        color: rgb(68, 41, 46);
        opacity: 0.4;
        margin-bottom: 1rem;
        width: 100%;
        .iconfont{
            font-size: 1.5rem;
        }
    }
    .list{
        li{
            margin-bottom: 1rem;
        }
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
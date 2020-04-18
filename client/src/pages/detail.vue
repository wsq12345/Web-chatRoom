<template>
    <div class="content">
        <headerGuide msg="个人信息"></headerGuide>
        <div style="height:40px"></div>
        <div class="box pic">
            <img :src=user.picUrl>
        </div>
        <div class="info">
            用户信息
        </div>
        <div class="box">
            昵称：{{user.username}}
        </div>
        <div class="box">
            注册时间：{{user.registerTime}}
        </div>
        <div class="control">
            <div class="box">
                <el-button type="success" class="btn" @click="add()">添加好友</el-button>
            </div>
            <div class="box">
                <el-button type="danger" class="btn" @click="del()">删除好友</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import { addFriend,delFriend } from '../api/api'
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        async add(){
            let param = new URLSearchParams();
            param.append('username',sessionStorage.getItem('user'));
            param.append('friend',this.user.username);
            param.append('status',0);
            let result = await addFriend(param);
            if(result!='error')
                this.$message.success('好友请求发送成功');
        },
        async del(){
            let param = new URLSearchParams();
            param.append('username',sessionStorage.getItem('user'));
            param.append('friend',this.user.username);
            let result = await delFriend(param);
            if(result!='error')
                this.$message.success('好友已删除');
        },
        async show(){
            let user=sessionStorage.getItem('friend');
            const params = new URLSearchParams();
            params.append('username',user);
            this.$store.dispatch('getUserInfo',params);
            this.user=this.$store.state.info;
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
    .content{
        .pic{
            height: 20rem;
            img{
                height: 20rem;
            }
        }
        .info{
            font-size: 1.2rem;
            opacity: 0.4;
        }
        .box{
            display: flex;
            flex: 1;
            font-size: 2rem;
            text-align: center;
            flex-direction: column;
            .btn{
                color: wheat;
                margin-top: 0.2rem;
            }
        }
        .control{
            width: 100%;
            position: absolute;
            bottom: 2rem;
        }
    }
</style>
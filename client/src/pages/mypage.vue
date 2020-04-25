<template>
    <div class="content">
        <headerGuide msg="我的"></headerGuide>
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
        <input type="file" accept="image/*" id="upload" @change="getFileName($event)">
        <div class="control">
            <div class="box">
                <el-button type="success" class="btn" @click="changeAvatar()">修改头像</el-button>
            </div>
            <div class="box">
                <el-button type="danger" class="btn" @click="logout()">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import { uploadImg,avatar } from '../api/api'
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        async show(){
            if(this.$store.state.user.name){
                this.user=this.$store.state.user;
                return;
            }
            let user = sessionStorage.getItem('user');
            let username = JSON.parse(user).name;
            await this.$store.dispatch('getUserInfo',username);
            this.user = this.$store.state.info;
        },
        logout(){
            sessionStorage.clear();
            this.$router.replace('/login');
        },
        changeAvatar(){
            document.querySelector('#upload').click();
        },
        getFileName(e){
            let tFiles = e.target.files[0];
            let param = new FormData();
            param.append('image',tFiles,tFiles.name);
            let config = {
                    //添加请求头 
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
            }
             uploadImg(param,config).then(async response=>{
                let url = response.data.url;
                let params = new URLSearchParams();
                params.append('username',JSON.parse(sessionStorage.getItem('user')).name);
                params.append('picUrl',url);
                let msg = await avatar(params);
                this.$message.success(msg.data.msg);
                this.user.picUrl = url;
            }).catch(e=>{
                console.log(e);
            })
        }
    },
    mounted(){
        this.show();
    },
    components:{
        headerGuide,
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
        #upload{
            display: none;
        }
        .control{
            width: 100%;
            position: absolute;
            bottom: 3rem;
        }
    }
</style>
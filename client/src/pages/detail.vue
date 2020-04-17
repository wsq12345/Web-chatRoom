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
            注册时间：{{user.sign}}
        </div>
        <div class="control">
            <div class="box">
                <el-button type="success" class="btn">添加好友</el-button>
            </div>
            <div class="box">
                <el-button type="danger" class="btn">删除好友</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
export default {
    data(){
        return{
            user:{
                username:'wsq',
                picUrl:'',
                sign:new Date().toLocaleDateString()
            }
        }
    },
    methods:{

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
<template>
    <div class="content">
        <headerGuide msg="个人信息"></headerGuide>
        <div>
            <img :src=user.picUrl>
        </div>
        <div>
            {{user.username}}
        </div>
        <div>
            注册时间：{{user.sign}}
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
                sign:new Date()
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
        width: 20rem;
        height: 20rem;
        border: 1px solid;
        z-index: 9999;
        background: rgb(161, 148, 148);
    }
</style>
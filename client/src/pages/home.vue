<template>
    <div>
        <headerGuide msg="消息"></headerGuide>
        <div style="height:40px"></div>
        <ul class="message">
            <li v-for="(item,index) in items" :key="item.index" @click="chat(index)">
                <img :src="pic" class="pic"><div class="name">{{item}}</div>
            </li>
        </ul>
        <div class="foot"></div>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
export default {
    data(){
        return{
            items:['群聊'],
            pic:'http://127.0.0.1:3000/public/image/touxiang.jpg'
        }
    },
    methods:{
        chat(index){
            this.$router.replace('/chatRoom');
        }
    },
    components:{
        headerGuide
    }
}
</script>

<style lang="less">
    .message{
        li{
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
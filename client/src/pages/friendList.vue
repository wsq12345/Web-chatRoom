<template>
    <div>
        <headerGuide msg="好友"></headerGuide>
        <ul>
            <li v-for="friend in friends" :key="friend.index">
                {{friend.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
export default {
    data(){
        return{
            friends:[{name:'群聊'}]
        }
    },
    methods:{
        show(){
            
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

</style>
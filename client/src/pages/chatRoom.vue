<template>
    <div>
        <headerGuide :msg="name"></headerGuide>
        <div style="height:40px"></div>
        <chat></chat>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import chat from '../components/chat'
export default {
    name: 'chatRoom',
    data(){
        return{
        }
    },
    computed:{
        name(){
            return JSON.parse(sessionStorage.getItem('friend')).name;
        }
    },
    components:{
        headerGuide,
        chat
    }
}
</script>

<style lang="less" scoped>
</style>
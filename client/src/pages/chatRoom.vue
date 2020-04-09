<template>
    <div>
        <headerGuide :msg="name"></headerGuide>
        <!-- <leftGuide></leftGuide> -->
        <div style="height:40px"></div>
        <chat></chat>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
// import leftGuide from '../components/leftGuide'
import chat from '../components/chat'
export default {
    name: 'chatRoom',
    data(){
        return{
        }
    },
    computed:{
        name(){
            return this.$store.state.chating;
        }
    },
    components:{
        headerGuide,
        // leftGuide,
        chat
    }
}
</script>

<style lang="less" scoped>
</style>
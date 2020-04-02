<template>
    <nav class="leftNav">
        <ul>
            <li v-for="(contact,index) in contacts" :key="contact.index" @click="change(index)">{{contact}}</li>
        </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            contacts: [
                '群聊',
                'test'
            ]
        }
    },
    methods:{
        change(index){
            this.$store.commit('getCharting',this.contacts[index]);
        }
    }
}
</script>

<style lang="less" scoped>
    .leftNav{
        height: calc(~"100vh - 40px");
        width: 200px;
        background: yellowgreen;
        float: left;
    }
</style>
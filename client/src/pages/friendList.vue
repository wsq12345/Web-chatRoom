<template>
    <div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            
        }
    },
    methods:{
        show(){
            let user=this.$store.getters.getUsername;
            console.log(user);
        }
    },
    mounted(){
        this.show();
    }
}
</script>

<style lang="less" scoped>

</style>
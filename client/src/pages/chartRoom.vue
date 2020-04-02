<template>
    <div>
        <headerGuide :msg="name"></headerGuide>
        <leftGuide></leftGuide>
        <chart></chart>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide'
import leftGuide from '../components/leftGuide'
import chart from '../components/chart'
export default {
    name: 'chartRoom',
    data(){
        return{
        }
    },
    computed:{
        name(){
            return this.$store.state.charting;
        }
    },
    components:{
        headerGuide,
        leftGuide,
        chart
    }
}
</script>

<style lang="less" scoped>
</style>
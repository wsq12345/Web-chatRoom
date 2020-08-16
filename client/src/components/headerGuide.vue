<template>
  <header class="head">
    <i class="iconfont icon-fanhui" @click="back()" v-if="$route.meta.backShow"></i>
    <h3>{{msg}}</h3>
  </header>
</template>

<script>
export default {
  name: 'headerGuide',
  props:{
    msg:String
  },
  data () {
    return {

    }
  },
  methods:{
    back(){
      let route = sessionStorage.getItem('route');
      this.$router.replace(route);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .head{
    i{
      float: left;
    }
    z-index: 1;
    background: rgb(140, 140, 240);
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: fixed;
  }
</style>

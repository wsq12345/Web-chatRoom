<template>
  <header class="head">
    <h4>{{msg}}</h4>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:{
    msg:String
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .head{
    z-index: 9999;
    background: rgb(140, 140, 240);
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: fixed;
  }
</style>

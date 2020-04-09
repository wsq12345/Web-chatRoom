<template>
  <div id="app">
    <router-view/>
    <footerGuide v-show="$route.meta.isShow"></footerGuide>
  </div>
</template>

<script>
import footerGuide from './components/footerGuide'
export default {
  name: 'App',
  components:{
    footerGuide
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
ul{
  list-style: none;
}
</style>

<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Login></Login>
  </div>

  <!--<div>-->
    <!--<router-view></router-view>-->
  <!--</div>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Login from './components/login/index'

export default {
  name: 'app',
  components: {
      Login
  }
}
</script>

<style>
html,body,#app {
  width: 100%;
  height: 100%;
  background-color: #55abff;

  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
   /*-webkit-font-smoothing: antialiased;*/
   /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>

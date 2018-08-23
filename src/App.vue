<template>
  <div id="app">
    <!--<nav>-->
      <!--<router-link to="/todo">Todo</router-link>-->
    <!--</nav>-->
    <h1>To-Do App</h1>
    <img width="100px" style="padding: 10px" src="https://obs.line-scdn.net/0h3lWwiRijbENqDkFaj5YTFEtTZyFZbHJISGgkJEwIMHZFNi57Vm0jJUgNNXBDNyNHVTp2JyEOOiEXPCMUVC0iLBxdMyQUaQ/f256x256"/>
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'app'
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

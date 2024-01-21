<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/chat">Диалоги</router-link> |
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  props: {
    chatbotId: String
  },
  setup(props) {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
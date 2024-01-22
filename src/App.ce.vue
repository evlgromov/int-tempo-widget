<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  props: {
    chatbotId: String
  },
  setup(props) {
    localStorage.setItem('chatbotId', props.chatbotId)
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

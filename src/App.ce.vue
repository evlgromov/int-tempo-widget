<template>
  <div style="display:flex;flex-direction: column;background: #fff;box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.2);width: 600px;height: 800px;position:absolute;bottom: 20px;right: 20px;z-index: 10;border-radius: 8px;">
    <ChatPage v-if="dialogues" />
    <Login v-else @toggleView="toggleView" />
  </div>
</template>

<script>
import Login from "@/pages/Login";
import ChatPage from "@/pages/ChatPage";
import { ref } from 'vue'

export default {
  name: 'App',
  components: {ChatPage, Login},
  props: {
    chatbotId: String
  },
  setup(props) {
    localStorage.setItem('chatbotId', props.chatbotId)

    const dialogues = ref(false)

    const toggleView = () => {
      dialogues.value = !dialogues.value
    }

    return { dialogues, toggleView }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.widget {
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.2);
  width: 600px;
  height: 900px;
}
</style>

<template>
  <div>
    <div v-for="message in messages">
      <div :style="message.direction == 'out' ? 'text-align: right' : 'text-align: left'">
        {{ message.message }}
      </div>
    </div>
  </div>
  <form>
    <div>
      <div>
        <input
          v-model="newMessage"
          type="text"
          placeholder="Введите текст сообщения..."
        />
      </div>
    </div>
    <div>
      <button
        @click.prevent="sendMessage"
        class="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
      >
        <span>Отправить</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from "vuex";

const store = useStore();
const dialogueId = localStorage.getItem('dialogue_id');
const chatbotId = localStorage.getItem('chatbotId');
const newMessage = ref(null);

const sendMessage = () => {
  store.dispatch("data/sendMessage", {
    'chat_bot_id': chatbotId,
    'dialogue_id': dialogueId,
    'message': newMessage.value
  });

  newMessage.value = null;

}

let messages = computed(function () {
  return store.state.data.messages
});

onMounted(() => {
  getMessages();
  initListenChannel();
})

const getMessages = () => {
  store.dispatch("data/getMessages", dialogueId);
}

const initListenChannel = () => {
  window.Echo.channel(
    `chatbot.${chatbotId}.${dialogueId}`
  ).listen(".Message", async (data) => {
    console.log(data)
  });
}

</script>

<style scoped>

</style>
<template>
  <div style="overflow-y: scroll;padding: 40px 20px 20px 20px;justify-content: flex-start !important; align-items: flex-start !important;">
    <div style="position:absolute; top: 0px;right: 0px;cursor: pointer" @click="toggleShowWidget">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64" fill="none">
        <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="black"/>
      </svg>
    </div>
    <div>
      <div style="padding: 20px;" v-for="message in messages">
        <div :style="message.direction == 'in' ? 'text-align: right' : 'text-align: left'">
          {{ message.message }}
        </div>
      </div>
    </div>
    <form>
      <div style="display:flex; position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)">
        <div>
          <div>
            <input
              v-model="newMessage"
              type="text"
              placeholder="Введите текст сообщения..."
            />
          </div>
        </div>
        <div style="margin-left: 10px;">
          <button
            @click.prevent="sendMessage"
            class="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          >
            <span>Отправить</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from "vuex";

const store = useStore();
const newMessage = ref(null);

const sendMessage = () => {
  store.dispatch("data/sendMessage", {
    'chat_bot_id': store.state.data.chatbotId,
    'dialogue_id': store.state.data.dialogueId,
    'message': newMessage.value
  });

  newMessage.value = null;

}

let messages = computed(function () {
  return store.state.data.messages
});

onMounted(() => {
  initListenChannel();
  getMessages();
})

const emit = defineEmits(["toggle-view", 'toggle-show-widget'])

const toggleShowWidget = () => {
  emit('toggle-show-widget')
  window.Echo.leave(`chatbot.${store.state.data.chatbotId}.${store.state.data.dialogueId}`);
}

const getMessages = () => {
  store.dispatch("data/getMessages", store.state.auth.dialogueUuid);
}

const initListenChannel = async () => {
  await store.dispatch("data/getDialogueData", { dialogue_uuid: store.state.auth.dialogueUuid });

  window.Echo.channel(
    `chatbot.${store.state.data.chatbotId}.${store.state.data.dialogueId}`
  ).listen(".Message", async (data) => {
    store.dispatch("data/storeMessage", { data, dialogueId: store.state.data.dialogueId })
  });
}

</script>

<style scoped>

</style>
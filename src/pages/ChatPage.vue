<template>
  <div class="messages" style="height: 100vh;background-image: url('https://cdn.jsdelivr.net/gh/evlgromov/int-tempo-widget@dev3/src/assets/images/bg.png');background-size: cover;background-position: center center;" ref="container">
    <div style="position:absolute;top: 0;left: 0;right: 0;padding-left:20px ;height: 60px;border-top-left-radius:16px;border-top-right-radius:16px;display:flex;justify-content:space-between;align-items: center;background:#FA7205;">
      <div style="font-size: 20px;color: #fff;font-weight: 600;">
        Онлайн-консультация
      </div>
      <div style="cursor: pointer" @click="toggleShowWidget">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="#ffffff">
          <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="#fff"/>
        </svg>
      </div>
    </div>
    <div style="padding: 80px 0 260px; display:flex; flex-direction: column">
      <div style="padding: 10px;" v-for="(message, index) in messages">
        <div style="display:flex;justify-content:center;">
          <span
            style="text-align: center;color:#4B5563;margin-bottom: 20px;"
            v-if="(index > 0
              && moment.unix(messages[index - 1].integration_created_at).format('LL') != moment.unix(message.integration_created_at).format('LL'))
              || index == 0
            ">
            {{ moment.unix(message.integration_created_at).locale("ru").format('LL') }}
          </span>
        </div>
        <div
          style="display: flex;"
          :style="message.direction == 'in' ? 'justify-content: flex-end;text-align:right' : 'justify-content: flex-start;text-align:left'"
        >
          <div style="max-width: 300px">
            <div class="message" style="padding: 20px;background: #F9FAFB;border-radius: 8px;box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.2);">
              {{ message.message }}
            </div>
            <span style="font-size: 12px;color:#4B5563">{{ moment.unix(message.integration_created_at).format("HH:mm") }}</span>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <div style="display:flex; align-items: center; justify-content: center; position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)">
        <div>
          <div style="width:100%">
            <input
              style="height: 50px;border-radius: 30px;padding: 0 30px;width: 250px;font-size:18px;"
              v-model="newMessage"
              type="text"
              placeholder="Введите текст сообщения..."
            />
          </div>
        </div>
        <div style="margin-left: 10px;">
          <svg style="cursor: pointer" @click.prevent="sendMessage" xmlns="http://www.w3.org/2000/svg" fill="none" height="30" viewBox="0 0 14 14" width="30"><g clip-path="url(#clip0_2_673)"><path clip-rule="evenodd" d="M1.866 5.02C1.94941 5.23071 2.07991 5.41955 2.24752 5.57207C2.41512 5.72459 2.61539 5.83677 2.833 5.9L7.619 7L2.878 8.039C2.65537 8.09993 2.44995 8.21177 2.27796 8.36571C2.10598 8.51965 1.97213 8.71146 1.887 8.926L0.749001 12.9C0.686737 13.0542 0.674058 13.2239 0.71273 13.3856C0.751401 13.5474 0.839499 13.693 0.964776 13.8023C1.09005 13.9117 1.24628 13.9792 1.41174 13.9957C1.5772 14.0121 1.74367 13.9766 1.888 13.894L12.9 7.7C13.025 7.63082 13.1293 7.52941 13.2018 7.4063C13.2744 7.2832 13.3127 7.14291 13.3127 7C13.3127 6.8571 13.2744 6.7168 13.2018 6.5937C13.1293 6.4706 13.025 6.36919 12.9 6.3L1.888 0.106004C1.74367 0.0234468 1.5772 -0.0120868 1.41174 0.00434315C1.24628 0.0207732 1.09005 0.0883503 0.964776 0.197679C0.839499 0.307007 0.751401 0.452654 0.71273 0.614368C0.674058 0.776082 0.686737 0.945828 0.749001 1.1L1.866 5.02Z" fill="#444A58" fill-rule="evenodd"/></g><defs><clipPath id="clip0_2_673"><rect fill="white" height="14" width="14"/></clipPath></defs></svg>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from "vuex";
import moment from 'moment';

const store = useStore();
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.length > 0) {
    store.dispatch("data/sendMessage", {
      'chat_bot_id': store.state.data.chatbotId,
      'dialogue_id': store.state.data.dialogueId,
      'message': newMessage.value
    });
    container.value.scrollTop += 100;
    newMessage.value = '';
  }

}

let messages = computed(function () {
  return store.state.data.messages
});
const container = ref(null);

onMounted(async () => {
  initListenChannel();
  await getMessages();
})

const emit = defineEmits(["toggle-view", 'toggle-show-widget'])

const toggleShowWidget = () => {
  emit('toggle-show-widget')
  window.Echo.leave(`chatbot.${store.state.data.chatbotId}.${store.state.data.dialogueId}`);
}

const getMessages = async () => {
  await store.dispatch("data/getMessages", store.state.auth.dialogueUuid);
  container.value.scrollTop = container.value.scrollHeight;
}

const initListenChannel = async () => {
  await store.dispatch("data/getDialogueData", { dialogue_uuid: store.state.auth.dialogueUuid });

  window.Echo.channel(
    `chatbot.${store.state.data.chatbotId}.${store.state.data.dialogueId}`
  ).listen(".Message", async (data) => {
    await store.dispatch("data/storeMessage", { data, dialogueId: store.state.data.dialogueId })
    if (data.message.direction == 'out') {
      container.value.scrollTop += 100;
      soundWarning();
    }
  });
}

function soundWarning() {
  var audio = new Audio();
  audio.src = 'https://cdn.jsdelivr.net/gh/evlgromov/int-tempo-widget@dev3/src/assets/sounds/message.mp3';
  audio.autoplay = true;
}

</script>
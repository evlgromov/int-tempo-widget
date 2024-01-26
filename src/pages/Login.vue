<template>
  <div class="col-md-12" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
    <div style="position:absolute; top: 0px;right: 0px;cursor: pointer;z-index: 50;" @click="toggleShowWidget">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64" fill="none">
        <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="black"/>
      </svg>
    </div>
    <div>
      <form @submit.prevent="handleLogin">
        <div>
          <div class="form-group" style="margin-bottom: 10px;">
            <input v-model="username" id="username" name="username" type="text" class="form-control"
               style="height: 40px;border-radius: 8px;padding: 0 20px;font-size: 18px;"
               placeholder="Введите имя"
            />
          </div>
          <div class="form-group">
            <button style="width: 100%;background: #FA7205;border: none;height: 40px;border-radius: 12px">
              <span style="color: #fff; font-size: 18px;">Войти</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import {useStore} from "vuex";
  import {computed} from "@vue/reactivity";

  let loggedIn = computed(() => {
    return store.state.auth.status.loggedIn
  })

  const store = useStore()
  const chatbotUuid = ref(localStorage.getItem('chatbot_uuid'));
  const username = ref('')
  const emit = defineEmits(["toggle-view", 'toggle-show-widget'])

  const toggleShowWidget = () => {
    emit('toggle-show-widget')
  }

  const handleLogin = () => {
    store.dispatch("auth/login", {
      username: username.value,
      chatbot_uuid: chatbotUuid.value
    }).then(
      (data) => {
        if (data.status == true && loggedIn.value == true) {
          localStorage.setItem('dialogue_uuid', store.state.auth.dialogueUuid);
          emit('toggle-view', store.state.auth.dialogueUuid)
        }
      },
      (error) => {}
    );
  }
</script>
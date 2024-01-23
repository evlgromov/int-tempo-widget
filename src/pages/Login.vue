<template>
  <div class="col-md-12" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
    <div>
      <form @submit.prevent="handleLogin">
        <div>
          <div class="form-group" style="margin-bottom: 10px;">
            <label for="username" style="margin-right:10px;">Username</label>
            <input v-model="username" id="username" name="username" type="text" class="form-control" />
          </div>
          <div class="form-group" style="margin-bottom: 10px;">
            <label for="email" style="margin-right:10px;">Email</label>
            <input v-model="email" id="email" name="email" type="email" class="form-control" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">
              <span>Login</span>
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
  const chatbotId = JSON.parse(localStorage.getItem('chatbotId'));
  const username = ref('')
  const email = ref('')
  const emit = defineEmits(["toggle-view"])

  const handleLogin = () => {
    store.dispatch("auth/login", {
      username: username.value,
      email: email.value,
      chatbotId
    }).then(
      (data) => {
        if (data.status == true && loggedIn.value == true) {
          localStorage.setItem('dialogue_id', store.state.auth.dialogue_id);
          emit('toggle-view')
        }
      },
      (error) => {}
    );
  }

</script>
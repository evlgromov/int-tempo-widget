<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form @submit.prevent="handleLogin">
        <div>
          <div class="form-group">
            <label for="username">Username</label>
            <input v-model="username" id="username" name="username" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
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
  import router from "@/router";
  import {computed} from "@vue/reactivity";

  let loggedIn = computed(() => {
    return store.state.auth.status.loggedIn
  })

  const store = useStore()
  const chatbotId = JSON.parse(localStorage.getItem('chatbotId'));
  const username = ref('')
  const email = ref('')

  const handleLogin = () => {
    store.dispatch("auth/login", {
      username: username.value,
      email: email.value,
      chatbotId
    }).then(
      (data) => {
        if (data.status == true && loggedIn.value == true) {
          localStorage.setItem('dialogue_id', store.state.auth.dialogue_id);
          router.push('/chat');
        }
      },
      (error) => {}
    );
  }

</script>
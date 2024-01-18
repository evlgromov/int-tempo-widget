import { createApp } from 'vue'
import App from './App.vue'

const mountEl = document.querySelector("#widget");

createApp(App,  { message: mountEl.dataset.chatbotId }).mount('#widget')

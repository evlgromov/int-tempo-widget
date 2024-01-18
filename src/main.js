import { createApp } from 'vue'
import App from './App.vue'

const mountEl = document.querySelector("#widget");
console.log(mountEl.dataset.chatbotId)

createApp(App,  { message: mountEl.dataset.chatbotId }).mount('#widget')

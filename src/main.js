import { createApp } from 'vue'
import App from './App.vue'

const mountEl = document.querySelector("#widget");

createApp(App, {
    props: ["message"]
}, { ...mountEl.dataset }).mount('#widget')

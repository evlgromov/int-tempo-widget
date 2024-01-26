<template>
  <div style="z-index: 1100;font-family: 'Inter';">
    <div v-if="showWidget" style="overflow: hidden;display:flex;flex-direction: column;background: #fff;box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.2);width: 450px;height: 850px;border-radius: 16px;">
      <ChatPage v-if="dialogueUuid" @toggleShowWidget="toggleShowWidget" style="overflow: scroll"/>
      <Login v-else @toggleView="toggleView" @toggleShowWidget="toggleShowWidget"/>
    </div>
    <div v-else @click="toggleShowWidget">
      <div style="background: #fff;border-radius: 50%;height: 100px;width: 100px;display:flex;align-items: center;justify-content:center;box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);">
        <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24" fill="none">
          <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/pages/Login";
import ChatPage from "@/pages/ChatPage";
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  components: {ChatPage, Login},
  props: {
    chatbotUuid: String
  },
  setup(props) {
    localStorage.setItem('chatbot_uuid', props.chatbotUuid)

    onMounted(() => {
      let link1 = document.createElement('link')
      link1.setAttribute('rel', 'preconnect')
      link1.setAttribute('href', 'https://fonts.googleapis.com')
      document.head.appendChild(link1)

      let link2 = document.createElement('link')
      link2.setAttribute('rel', 'preconnect')
      link2.setAttribute('href', 'https://fonts.gstatic.com')
      document.head.appendChild(link2)

      let link3 = document.createElement('link')
      link3.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
      link3.setAttribute('rel', 'stylesheet')
      document.head.appendChild(link3)
    })

    const dialogueUuid = ref(localStorage.getItem('dialogue_uuid'))
    const showWidget = ref(false)

    const toggleShowWidget = () => {
      showWidget.value = !showWidget.value
    }

    const toggleView = (uuid) => {
      dialogueUuid.value = uuid;
    }

    return { dialogueUuid, toggleView, showWidget, toggleShowWidget }
  }
}
</script>

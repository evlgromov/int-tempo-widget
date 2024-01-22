import { createRouter, createWebHistory } from "vue-router"
import ChatPage from "@/pages/ChatPage";
import Register from "@/pages/Login";
const routes = [
    {
        path : "/",
        component : Register,
    },
    {
        path : "/chat",
        component : ChatPage
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/']
    const authRequired = !publicPages.includes(to.path)
    const chatbotId = JSON.parse(localStorage.getItem('chatbotId'))
    const dialogueId = JSON.parse(localStorage.getItem('dialogue_id'))

    if (authRequired && (chatbotId == null || dialogueId == null)) {
        next('/')
    } else{
        next()
    }
});

export default router;
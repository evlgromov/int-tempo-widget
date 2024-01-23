import { createRouter, createWebHistory } from "vue-router"
import ChatPage from "@/pages/ChatPage";
import Login from "@/pages/Login";
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path : "/login",
        component : Login,
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
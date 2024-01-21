import { createRouter, createWebHistory } from "vue-router"
import AuthPage from "@/pages/AuthPage";
import ChatPage from "@/pages/ChatPage";
const routes = [
    {
        path : "/",
        component : AuthPage
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

export default router;
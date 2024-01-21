import { createRouter, createWebHistory } from "vue-router"
import ChatPage from "@/pages/ChatPage";
import Login from "@/pages/Login";
const routes = [
    {
        path : "/",
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

export default router;
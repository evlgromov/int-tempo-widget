import App from './App.ce.vue'
import router from "./router"
import store from "@/store";
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'

// const mountEl = document.querySelector("#widget");

const defineElement = (component, { plugins = [] } = {}) =>
    VueDefineCustomElement({
        render: () => h(component),
        setup(...props) {
            const app = createApp()

            console.log(props)
            // install plugins
            plugins.forEach(app.use)

            const inst = getCurrentInstance()
            Object.assign(inst.appContext, app._context)
            Object.assign(inst.provides, app._context.provides)
        },
    })

customElements.define(
    'int-tempo-widget',
    defineElement(App, {
        plugins: [store, router],
    })
)



// createApp(App,  { chatbotId: mountEl.dataset.chatbotId })
//     .use(router)
//     .use(store)
//     .mount('#widget');

import App from './App.ce.vue'
import store from "@/store/index";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'

const defineElement = (component, { plugins = [] } = {}) =>
    VueDefineCustomElement({
        props: component.props,
        styles: [

        ],
        setup(props) {
            const app = createApp()
            plugins.forEach(app.use)

            const inst = getCurrentInstance()
            Object.assign(inst.appContext, app._context)
            Object.assign(inst.provides, app._context.provides)

            return () => h(component, props)
        }
    })

customElements.define(
    'int-tempo-widget',
    defineElement(App, {
        plugins: [store],
    })
)

// createApp(App).use(store).mount('#app')

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: 'uX61xhVhREoO90BKfWW6r_0_HHgbTM8nld4Qe_kWx6Q',
    wsHost: 'localhost',
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
});

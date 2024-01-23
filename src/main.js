import App from './App.ce.vue'
import router from "./router"
import store from "@/store/index";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

const defineElement = (component, { plugins = [] } = {}) =>
    VueDefineCustomElement({
        props: component.props,
        setup(props) {
            const app = createApp()
            plugins.forEach(app.use)
            app.component('font-awesome-icon', FontAwesomeIcon)

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

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: 'uX61xhVhREoO90BKfWW6r_0_HHgbTM8nld4Qe_kWx6Q',
    wsHost: 'localhost',
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
});

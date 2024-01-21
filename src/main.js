import App from './App.ce.vue'
import router from "./router"
import store from "@/store";
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'

const defineElement = (component, { plugins = [] } = {}) =>
    VueDefineCustomElement({
        props: component.props,
        setup(props) {
            const app = createApp()
            plugins.forEach(app.use)

            const inst = getCurrentInstance()
            Object.assign(inst.appContext, app._context)
            Object.assign(inst.provides, app._context.provides)

            return () => h(component, props)
        },
    })

customElements.define(
    'int-tempo-widget',
    defineElement(App, {
        plugins: [store, router],
    })
)

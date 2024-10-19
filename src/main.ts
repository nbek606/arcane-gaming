import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.ts";
import vuetify from "./plugins/vuetify.ts";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(vuetify)
app.mount('#app')

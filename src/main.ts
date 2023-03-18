import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import store from './store'
import './permission' // permission control
import '@/assets/styles/index.scss' // global css
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// @ts-ignore
import store from './store'

import '@/assets/styles/index.scss' // global css
//svg图表
import 'virtual:svg-icons-register'
// @ts-ignore
import SvgIcon from '@/components/SvgIcon'
// @ts-ignore
import elementIcons from '@/components/SvgIcon/svgicon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

app.mount('#app')

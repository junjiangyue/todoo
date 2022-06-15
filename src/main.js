import { createApp } from 'vue'
import { createPinia } from 'pinia'
import weekSlider from 'v-week-slider'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './assets/common.css'
import axios from 'axios'
import './assets/css/icon.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$axios = axios;
app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.mount('#app')
.use(weekSlider)
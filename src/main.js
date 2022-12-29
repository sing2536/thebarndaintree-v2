import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import fetchInterceptor from './mixins/fetchInterceptor'
import './assets/css/base.less'
import './assets/css/loader.less'
import tooltip from './mixins/tooltip-vue3'
import focus from './mixins/focus'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import './assets/css/pagination.less'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(tooltip)
app.use(focus)
app.use(VueAwesomePaginate)

fetchInterceptor()

app.mount('#app')

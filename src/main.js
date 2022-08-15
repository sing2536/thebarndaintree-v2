import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.less";
import Vue3TouchEvents from "vue3-touch-events"
import scrollFade from './plugins/scroll-fade.js'


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3TouchEvents);
app.use(scrollFade)

app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.less";
import scrollFade from './plugins/scroll-fade.js'
import vClickOutside from "click-outside-vue3"
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(scrollFade)
app.use(vClickOutside)
app.use(VueLazyLoad)

app.mount("#app");

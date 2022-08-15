import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.less";
import Vue3TouchEvents from "vue3-touch-events"


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3TouchEvents);

app.directive('scrollFade', {
    mounted: (el) => {
        const bounding = el.getBoundingClientRect()
        console.log(bounding);

        const isVisible = ()=>{
            if (bounding.x-bounding.height <= document.getElementById('app').scrollTop) {
                return true
            }
            return false
        }

        const scrollHandler = ()=>{
            if (isVisible()) {
                console.log(el.innerText);
                el.style.opacity = 1
                el.style.translate = '0'
                document.getElementById('app').removeEventListener("scroll", scrollHandler);
            }
        }

        el.style.opacity = 0
        el.style.translate = '0 50px'
        el.style.transition = 'opacity 1s, translate 1s'

       
        document.getElementById('app').addEventListener("scroll", scrollHandler);
    }
})

app.mount("#app");

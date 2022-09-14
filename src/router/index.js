import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import storeIndex from '@/stores/index'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/gallery",
      name: "Gallery",
      component: () => import("../views/GalleryView.vue"),
    },
    {
      path: "/expect",
      name: "What to Expect",
      component: () => import("../views/ExpectView.vue"),
    },
    {
      path: "/booking",
      name: "Booking",
      component: () => import("../views/BookingView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
});

router.beforeEach((to, from) => {
  const store = storeIndex()
  store.sideBarActive = false
  store.headerLoading = true

  document.querySelector('#app').scrollTop = 0
})

router.afterEach((to)=>{
  document.title = to.name+' - The Barn Daintree Holiday House'
})

export default router;

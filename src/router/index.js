import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import storeIndex from '@/stores/index'

const router = createRouter({
  history: createWebHistory('/v2/'),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/gallery",
      name: "gallery",
      component: () => import("../views/GalleryView.vue"),
    },
    {
      path: "/expect",
      name: "what to expect",
      component: () => import("../views/ExpectView.vue"),
    },
    {
      path: "/booking",
      name: "booking",
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
})

export default router;

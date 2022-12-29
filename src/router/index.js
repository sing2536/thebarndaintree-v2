import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BlankView from '../views/BlankView.vue'
import SignupView from '../views/SignupView.vue'
import PasswordResetView from '../views/PasswordResetView.vue'
import PasswordResetInvalidView from '../views/PasswordResetInvalidView.vue'
import PasswordRecoveryView from '../views/PasswordRecoveryView.vue'
import PropertiesView from '../views/PropertiesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/password-recovery',
      name: 'password-recovery',
      component: PasswordRecoveryView,
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordResetView,
    },
    {
      path: '/password-reset-invalid',
      name: 'password-reset-invalid',
      component: PasswordResetInvalidView,
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertiesView,
    },
    {
      path: '/blank',
      name: 'blank',
      component: BlankView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

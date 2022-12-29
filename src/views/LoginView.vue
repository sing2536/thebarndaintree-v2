<script setup>
import { ref } from 'vue';
import PublicPage from '../components/PublicPage.vue';
import router from '../router'
import { useLoaderStore } from '../stores/loader';

const loader = useLoaderStore()

const websiteDomain = import.meta.env.VITE_WEBSITE_DOMAIN
const error = ref('')
const email = ref('')
const password = ref('')

async function login() {
  loader.active = true
  error.value = ''
  const req = await fetch('api/users/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email.value, password: password.value})
  })
  if (req.status == 200) return router.push('/')
  
  loader.active = false
  if (req.status == 401) return error.value = 'Incorrect username or password'

  error.value = 'Something went wrong, please try again.'  
}
</script>

<template>
    <PublicPage>
      <div class="login-wrapper">
        <h2>Sign in</h2>
        <div v-if="error" class="error-wrapper">
          <p>{{error}}</p>
        </div>
        <form @submit.prevent="login()">
          <div class="field">
            <label>Email</label>
            <input v-model="email" type="text" autocapitalize="off">
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="password" type="password">
          </div>
          <button class="raised primary" type="submit">Login</button>
        </form>
        <div class="info-wrapper">
          <p>Not already a customer? <a :href="websiteDomain">Learn more.</a></p>
          <p><a href="#" @click.prevent="router.push('/password-recovery')">Forgotten password.</a></p>  
        </div>
      </div>
    </PublicPage>
</template>

<style lang="less" scoped>
.login-wrapper {
  width: 260px;
}
.error-wrapper {
  background: var(--color-red);
  border-radius: var(--radius-normal);
  padding: var(--gap-xtiny);
  margin-bottom: var(--gap-small);
  color: white;
}

.info-wrapper {
  padding-top: var(--gap-medium);
  display: flex;
  flex-direction: column;
  gap: var(--gap-xtiny);
}

h2, h3 {
  padding-bottom: var(--gap-medium);
}

p {
  font-size: smaller;
  text-align: center;
  font-weight: 500;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
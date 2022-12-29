<script setup>
import { ref } from 'vue';
import PublicPage from '../components/PublicPage.vue';
import router from '../router'
import { useLoaderStore } from '../stores/loader';

const loader = useLoaderStore()

const websiteDomain = import.meta.env.VITE_WEBSITE_DOMAIN
const error = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

async function signup() {
  loader.active = true
  error.value = ''
  if (password.value != passwordConfirm.value) {
    error.value = 'Password does not match confirm password'
    loader.active = false
    return
  }
  const req = await fetch('api/users/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      })
  })
  if (req.status == 200) return window.open('./api/subscribe', '_self')
  loader.active = false

  error.value = 'Something went wrong, please try again.'  
}
</script>

<template>
  <PublicPage>
      <div class="signup-info">
        <h2>$3 USD a month</h2>
        <p>Simple and affordable booking manager for your holiday properties.</p>
      </div>
      <div class="content-wrapper">
        <h2>Sign up</h2>
        <div v-if="error" class="error-wrapper">
          <p>{{error}}</p>
        </div>
        <form @submit.prevent="signup()">
          <div class="field">
            <label>First Name</label>
            <input v-model="firstName" type="text">
          </div>
          <div class="field">
            <label>Last Name</label>
            <input v-model="lastName" type="text">
          </div>
          <div class="field">
            <label>Email</label>
            <input v-model="email" type="text" autocapitalize="off">
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="password" type="password">
          </div>
          <div class="field">
            <label>Confirm Password</label>
            <input v-model="passwordConfirm" type="password">
          </div>
          <button class="raised primary" type="submit">Continue</button>
        </form>
        <div class="info-wrapper">
          <p>By signing up you agree to our<br /> <a :href="websiteDomain+'terms-of-service'" target="_blank">Terms of Service</a> and <a :href="websiteDomain+'privacy-policy'" target="_blank">Privacy Policy.</a></p>
          <p>Already a customer? <a href="#" @click.prevent="router.push('/signin')">Sign in.</a></p>
        </div>
      </div>
  </PublicPage>
</template>

<style lang="less" scoped>
.content-wrapper {
  width: 300px;
}

.signup-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--gap-medium);
  max-width: 260px;

  h2 {
    padding-bottom: var(--gap-tiny);
  }
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

h3, h2 {
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
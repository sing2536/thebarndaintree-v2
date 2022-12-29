<script setup>
import { ref } from 'vue';
import MessageBox from '../components/MessageBox.vue';
import PublicPage from '../components/PublicPage.vue';
import router from '../router'
import { useLoaderStore } from '../stores/loader';

const loader = useLoaderStore()
const email = ref('')
const submitted = ref(false)

async function recover() {
  loader.active = true
  const req = await fetch('api/password-reset', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email.value})
  })
  submitted.value = true
  loader.active = false
}
</script>

<template>
    <PublicPage>
      <div v-if="!submitted" class="content-wrapper">
        <h2>Password reset</h2>
        <p>Enter your email below and we'll send you a link to reset your password.</p>
        <form @submit.prevent="recover()">
          <div class="field">
            <label>Email</label>
            <input v-model="email" type="text" autocapitalize="off">
          </div>
          <button class="raised primary" type="submit">Send</button>
        </form>
      </div>
      <div v-else class="content-wrapper">
        <h2>Requst received</h2>
        <p>If the email exists in our system we'll send you a link shortly.</p>
        <MessageBox class="checkspam" type="danger">Please check your junk or spam folders.</MessageBox>
      </div>
    </PublicPage>
</template>

<style lang="less" scoped>
.content-wrapper {
  width: 300px;
}

h3, h2 {
  padding-bottom: var(--gap-medium);
}

.checkspam {
  margin-top: var(--gap-small);
}

form {
  margin-top: var(--gap-medium);
  display: flex;
  flex-direction: column;
}
</style>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PublicPage from '../components/PublicPage.vue';
import { useConfirmModalStore } from '../stores/confirmModal';
import { useLoaderStore } from '../stores/loader';

const router = useRouter()
const route = useRoute()
const loader = useLoaderStore()
const confirmModal = useConfirmModalStore()
const error = ref('')
const password = ref('')
const passwordConfirm = ref('')

async function passwordChange() {
  loader.active = true
  error.value = ''
  if (password.value != passwordConfirm.value) {
    error.value = 'New password does not match confirm new password'
    loader.active = false
    return
  }

  const req = await fetch('api/password-reset?token='+route.query.token, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password.value,
      })
  })
  
  if (req.status == 200) {
    confirmModal.show({title: 'Password changed!', message: 'You will now be directed to login to your account.'})
    loader.active = false
    router.push('/signin')
    return
  }
  
  loader.active = false
  error.value = 'Something went wrong, please try again.'  
}
</script>

<template>
  <PublicPage>
    <div class="content-wrapper">
      <h2>Create new password</h2>
      <div v-if="error" class="error-wrapper">
        <p>{{error}}</p>
      </div>
      <form @submit.prevent="passwordChange()">
        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password">
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <input v-model="passwordConfirm" type="password">
        </div>
        <button class="raised primary" type="submit">Change</button>
      </form>
    </div>
  </PublicPage>
</template>

<style lang="less" scoped>
.content-wrapper {
  width: 260px;
}

h3, h2 {
  padding-bottom: var(--gap-medium);
}

.error-wrapper {
  background: var(--color-red);
  border-radius: var(--radius-normal);
  padding: var(--gap-xtiny);
  margin-bottom: var(--gap-small);
  font-size: smaller;
  text-align: center;
  font-weight: 500;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
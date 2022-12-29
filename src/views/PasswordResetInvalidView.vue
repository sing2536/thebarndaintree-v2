<script setup>
import PublicPage from '../components/PublicPage.vue';
import { useGetHelpStore } from '../stores/getHelp';

const getHelp = useGetHelpStore()
</script>

<template>
    <PublicPage>
      <div class="content-wrapper">
        <h2>Password reset link invalid</h2>
        <p>The password reset link has either expired, or is not valid. Please attemp another password reset and if issue still persists, <a href="#" @click.prevent="getHelp.open()">please contact us.</a></p>
      </div>
    </PublicPage>
</template>

<style lang="less" scoped>
.content-wrapper {
  width: 600px;
  text-align: center;
}

h3, h2 {
  padding-bottom: var(--gap-medium);
}

form {
  margin-top: var(--gap-medium);
  display: flex;
  flex-direction: column;
}

@media (max-width: 800px) {
  .content-wrapper {
    width: 100%;
  }
}
</style>
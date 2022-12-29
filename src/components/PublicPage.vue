<script setup>
import { useRouter } from 'vue-router';
import Logo from './Logo.vue';
const router = useRouter()
</script>

<template>
  <div>
    <div class="page-container">
      <div class="page-wrapper">
        <Logo />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  height: 100vh;
  background: var(--color-background);
  z-index: 3;
}
.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--color-background2);
    border-radius: var(--radius-normal);
    padding: var(--gap-medium);
    max-height: 95vh;
    overflow: auto;
}
.logo-wrapper {
    margin-bottom: var(--gap-large);
}
@media (max-width: 600px) {
  .page-container {
    background-color: var(--color-background2);
  }
  .page-wrapper {
    width: 100vw;
    padding-bottom: 100px;
  }
}
</style>
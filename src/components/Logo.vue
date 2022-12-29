<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="logo-wrapper" @click="router.push('/')">
        <img width="28" height="28"  src="@/assets/images/logo.svg" alt="logo">
        <div class="logo">myguests</div>
    </div>
</template>

<style lang="less" scoped>
.logo-wrapper {
    font-size: 18px;
    display: flex;
    gap: var(--gap-tiny);
    align-items: center;
    font-weight: 800;
    letter-spacing: -1px;
    cursor: pointer;
}
</style>
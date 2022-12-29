<script setup>
import { useLoaderStore } from '../stores/loader';

const loader = useLoaderStore()
</script>

<template>
    <Transition name="fade">
        <div v-if="loader.active" class="mask">
            <div class="loader"></div>
        </div>
    </Transition>
</template>

<style lang="less" scoped>
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    background-color: var(--mask-background)
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
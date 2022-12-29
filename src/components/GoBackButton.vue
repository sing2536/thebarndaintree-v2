<script setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="button-container" @click="router.back()">
        <Icon class="icon" icon="material-symbols:arrow-back-rounded" />
        <div class="text">GO BACK</div>
    </div>
</template>

<style lang="less" scoped>
.button-container {
    display: flex;
    align-items: center;
    gap: var(--gap-xtiny);
    align-self: self-start;
    margin-bottom: var(--gap-medium);

    &:hover {
        cursor: pointer;
        color: var(--color-primary)
    }
}
.icon {
    font-size: x-large;
}
.text {
    font-size: smaller;
    font-weight: 500;
}
</style>
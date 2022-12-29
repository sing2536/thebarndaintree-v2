<script setup>
import { Icon } from '@iconify/vue';
import { useSidebarStore } from "../stores/sidebar";

const sidebar = useSidebarStore()
</script>

<template>
    <div>
        <div v-if="sidebar.collaps" class="wrapper">
            <Icon class="button" @click="sidebar.toggleActive()" icon="mingcute:menu-fill" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.wrapper {
    display: flex;
    // margin-right: var(--gap-medium);
    font-size: x-large;
}

.button {
    &:hover {
        cursor: pointer;
        color: var(--color-primary);
    }
}
</style>

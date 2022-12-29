<script setup>
import { useRouter } from 'vue-router';
import NavSidebarToggleVue from './NavSidebarToggle.vue';
import Search from './BookingSearch.vue';
import { Icon } from '@iconify/vue';
import Logo from './Logo.vue';

const router = useRouter()
</script>

<template>
    <div class="container">
        <div class="first-group">
            <Logo />
            <Search />
        </div>
        <div class="end">
            <NavSidebarToggleVue />
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    width: 100%;
    padding: 10px 28px;
    border-bottom: 1px solid var(--color-shade);
    background: var(--color-background);
    z-index: 2;
}

.first-group {
    display: flex;
    align-items: center;
}

.logo-wrapper {
    font-size: 1.2em;
    display: flex;
    gap: var(--gap-tiny);
    align-items: center;
    font-weight: 800;
    letter-spacing: -1px;
    cursor: pointer;
}

.end {
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap-small);
}

.button {
    font-size: x-large;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        color: var(--color-primary)
    }
}
</style>
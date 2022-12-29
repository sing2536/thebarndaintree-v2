<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { useSidebarStore } from '../stores/sidebar';
import { onMounted } from '@vue/runtime-core';
import menuItems from '../mixins/menuItems';

const sidebar = useSidebarStore()

function resizeHandler() {
    const ele = document.querySelector('.main-container')
    if (window.innerWidth > 1200) {
        sidebar.collaps = false
        sidebar.active = true
        ele.classList.remove('sidebar-collapsed')
    } else {
        sidebar.collaps = true, sidebar.active = false
        ele.classList.add('sidebar-collapsed')
    }
}

window.addEventListener('resize', resizeHandler)

onMounted(()=>{
    resizeHandler()
})
</script>

<template>
    <div>
        <Transition name="slide">
            <div v-if="sidebar.active" :class="['container', sidebar.collaps ? 'collapsed':'']">
                <div class="sidebar-padding">
                    <SidebarMenu :list="menuItems"/>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="sidebar.collaps && sidebar.active" class="mask" @click="sidebar.active = false"></div>
        </Transition>
    </div>
</template>

<style lang="less" scoped>
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: var(--mask-background);
    z-index: 2;
}
.container {
    position: fixed;
    right: 0;
    width: var(--sidebar-width);
    border-left: 1px solid var(--color-shade);
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--nav-height));
    background: var(--color-background);
    z-index: 1;

    &.collapsed {
        top: 0;
        height: 100%;
        z-index: 3;
    }
}

.sidebar-padding {
    padding: var(--gap-small) var(--gap-small);
}

.info {
    display: flex;
    flex-direction: column;
    font-size: smaller;
    gap: var(--gap-tiny);
    color: var(--color-text2);

    .align-right {
        text-align: center;
    }
}

.slide-leave-active,
.slide-enter-active {
  transition: all .25s ease;
}
.slide-enter-active{
}
.slide-enter-from {
  transform: translate(120%);
}
.slide-leave-to {
  transform: translate(120%);
}

.fade-enter-active, .fade-leave-active {
    transition: all .4s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
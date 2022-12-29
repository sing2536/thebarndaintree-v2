<script setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const props = defineProps(['list'])
const router = useRouter()

function clickHandler(item) {
    if (item.callBack) item.callBack()
    if (item.path) router.push(item.path) 
    if (item.value != undefined) item.value = !item.value
    if (item.url) window.open(item.url, '_self')
}
</script>

<template>
    <div class="sidebar-menu-container">
        <div :class="[
            'item-wrapper', 
            item.hidden & item.hidden == true ? 'hide':'',
            item.highlight ? 'hightlight':'',
        ]" v-for="(item, index) in list" @click="clickHandler(item)" :key="index">
            <Icon class="icon" :icon="item.icon" />
            <div class="label">{{item.label}}</div>
            <div v-if="item.switch" class="switch-wrapper" @click.stop>
                <label class="switch">
                    <input type="checkbox" v-model="item.value">
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.sidebar-menu-container {
    display: flex;
    flex-direction: column;
}

.item-wrapper {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-radius: var(--radius-normal);
    gap: 24px;

    &.hightlight {
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
        font-weight: 500;
    }

    .label {
        font-size: small;
    }

    .icon {
        font-size: x-large;
    }

    &:hover {
        cursor: pointer;
        background: var(--color-shade);
    }

    &.hide {
        display: none;
    }
}
.switch-wrapper {
    display: flex;
    flex: 1;
    justify-content: flex-end;
}
</style>
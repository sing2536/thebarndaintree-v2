<script setup>
import Modal from './Modal.vue'
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

defineProps(['title'])

const active = ref(false)
</script>

<template>
    <div>
        <div class="help-button" @click="active = true">
            <a>Help</a>
            <Icon icon="material-symbols:help-outline-rounded" />
        </div>

        <Modal :modal-active="active" @close="active = false">
            <h2>{{title ? title+' ':''}}Help</h2>
            <div class="content">
                <slot />
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped>
.help-button {
    height: 42px;
    font-weight: 500;
    font-size: small;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap-xtiny);
    color: var(--color-primary);

    svg {
        font-size: larger;
    }

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}
h2 {
    padding-bottom: var(--gap-medium);
}
.content {
    display: flex;
    gap: var(--gap-large);
    flex-direction: column;
    font-size: small;
    width: 540px;
}

@media (max-width: 800px) {
    .content {
        width: 100%;
    }
}
</style>
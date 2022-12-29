<script setup>
import { useConfirmModalStore } from '../stores/confirmModal';
import Modal from './Modal.vue'
const confirmModal = useConfirmModalStore()
</script>

<template>
    <Modal :modal-active="confirmModal.modal" @close="confirmModal.close()">
        <div>
            <h2 v-if="confirmModal.data.title">{{confirmModal.data.title}}</h2>
            <p v-if="confirmModal.data.message" class="message">{{confirmModal.data.message}}</p>
        </div>
    </Modal>
</template>

<style lang="less" scoped>
h2 {
    padding-bottom: var(--gap-small);
}
.message {
    white-space: pre-line
}
</style>
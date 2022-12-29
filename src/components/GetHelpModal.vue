<script setup>
import { useGetHelpStore } from '../stores/getHelp';
import Modal from './Modal.vue'

const getHelp = useGetHelpStore()
</script>

<template>
    <Modal :modal-active="getHelp.modal" @close="getHelp.close()">
        <h2>Get Help</h2>

        <p>Please email us at: <a href="mailto: myguestsapp@gmail.com">myguestsapp@gmail.com</a></p>
        <p>We aim to get back to you as soon as possible, typically within 24 hours.</p>
    </Modal>
</template>

<style lang="less" scoped>
h2 {
    padding-bottom: var(--gap-medium);
}

p {
    margin-bottom: var(--gap-small);
}
</style>
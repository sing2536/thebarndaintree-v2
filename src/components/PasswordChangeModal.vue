<script setup>
import Modal from './Modal.vue'
import { userPasswordChangeStore } from '../stores/passwordChange'

const passwordChange = userPasswordChangeStore()
</script>

<template>
    <Modal :modal-active="passwordChange.modal" @close="passwordChange.close()">
        <h2>Change Password</h2>
        <div class="content">
            <div v-if="passwordChange.error" class="error-wrapper">
                <p>{{passwordChange.error}}</p>
            </div>
            <div class="field">
                <label>Current Password</label>
                <input v-model="passwordChange.passwordCurrent" type="password">
            </div>
            <div class="field">
                <label>New Password</label>
                <input v-model="passwordChange.passwordNew" type="password">
            </div>
            <div class="field">
                <label>Confirm New Password</label>
                <input v-model="passwordChange.passwordNewConfirm" type="password">
            </div>

        </div>

        <template #footer>
            <div class="actions">
                <button @click="passwordChange.passwordChange()" class="raised primary">Change</button>
            </div>
        </template>
    </Modal>
</template>

<style lang="less" scoped>
h2 {
    padding-bottom: var(--gap-medium);
}
p {
    font-size: smaller;
    padding: var(--gap-tiny) 0;
}
.content {
    display: flex;
    // gap: var(--gap-tiny);
    flex-direction: column;
    width: 540px;
}
.error-wrapper {
    background: var(--color-red);
    border-radius: var(--radius-normal);
    padding: var(--gap-xtiny);
    margin-bottom: var(--gap-small);
    font-weight: 500;

    p {
        padding: 0;
        color: white;
    }
}
@media (max-width: 800px) {
    .content {
        width: 100%;
    }
}
.actions {
    display: flex;
    justify-content: flex-end;
}
</style>
<script setup>
import { ref } from 'vue';
import { useBookingModalStore } from '../stores/bookingModal';
import { useConfirmModalStore } from '../stores/confirmModal';
import { useLoaderStore } from '../stores/loader';

const bookingModal = useBookingModalStore()
const confirmModal = useConfirmModalStore()
const loader = useLoaderStore()
const message = ref('')

async function add() {
    loader.active = true

    const req = await fetch('api/comments/'+bookingModal.data.id, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: message.value})
    })

    loader.active = false
    if (req.status != 200) return confirmModal.show({title: 'Error', message: 'There was a problem processing your request'})
    bookingModal.data.comments.unshift(await req.json())
    message.value = ''
}
</script>

<template>
    <div>
        <div class="field">
            <label>Message</label>
            <div class="form-wrapper">
                <textarea type="text" v-model="message"></textarea>
                <button class="raised" @click="add()">Add</button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.field {
    padding-bottom: var(--gap-medium);
}
.form-wrapper {
    display: flex;
    gap: var(--gap-tiny);

    button {
        align-self: flex-end;
    }
}
</style>
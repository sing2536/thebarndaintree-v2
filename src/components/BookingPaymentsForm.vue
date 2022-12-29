<script setup>
import { ref } from 'vue';
import { useBookingModalStore } from '../stores/bookingModal';
import { useConfirmModalStore } from '../stores/confirmModal';
import { useLoaderStore } from '../stores/loader';

const bookingModal = useBookingModalStore()
const confirmModal = useConfirmModalStore()
const loader = useLoaderStore()
const amountReceived = ref()

async function add() {
    //incase user made unsaved changes to booking
    await bookingModal.save(true)

    const req = await fetch('api/receipts/'+bookingModal.data.id, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amountReceived: amountReceived.value})
    })
    loader.active = false
    if (req.status != 200) return confirmModal.show({title: 'Error', message: 'There was a problem processing your request'})
    
    bookingModal.data.receipts.unshift(await req.json())
    amountReceived.value = null
}
</script>

<template>
    <div>
        <div class="field">
            <label>Amount</label>
            <div class="form-wrapper">
                <input type="text" v-model="amountReceived" placeholder="0.00" @keypress.enter="add()">
                <button class="raised" @click="add()">Add</button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.form-wrapper {
    display: flex;
    gap: var(--gap-tiny);
}

input {
    width: 100px !important;
}
</style>
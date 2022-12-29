<script setup>
import { useBookingModalStore } from '../stores/bookingModal'

const bookingModal = useBookingModalStore()

</script>

<template>
    <div class="action-wrapper">
        <button v-if="bookingModal.creating" class="raised primary" @click="bookingModal.createSave()">Create</button>
        <button v-else class="raised primary" @click="bookingModal.save()">Save</button>
    </div>
</template>

<style lang="less" scoped>
.action-wrapper {
    display: flex;
    justify-content: flex-end;
}
</style>
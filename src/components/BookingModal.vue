<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue'
import BookingModalFields from './BookingModalFields.vue'
import BookingComments from './BookingComments.vue';
import BookingPayments from './BookingPayments.vue';
import { useBookingModalStore } from '../stores/bookingModal'
import BookingModalActions from './BookingModalActions.vue';
import BookingHistory from './BookingHistory.vue';
import { usePropertiesStore } from '../stores/properties';

const bookingModal = useBookingModalStore()
const properties = usePropertiesStore()

function propertyName() {
    if (bookingModal.creating) return properties.list.find(x => x.id == properties.selected).name
    return bookingModal.data.property.name
}
</script>

<template>
    <Modal :modal-active="bookingModal.modal" @close="bookingModal.close()">
        <div>
            <h2>{{bookingModal.creating ? 'Create':'Manage'}} Booking</h2>
            <div class="content">
                <div>
                    <p class="info">Property: {{propertyName()}}</p>
                    <p v-if="bookingModal.data.id" class="info">Booking ID: {{bookingModal.data.id}}</p>
                </div>
                <div v-if="bookingModal.creating">
                    <p class="sub">Once the booking is created you will have access to payments and receipts.</p>
                </div>
                <div class="group">
                    <BookingModalFields />
                    <!-- <BookingHistory /> -->
                </div>
                <BookingPayments v-if="!bookingModal.creating"/>
                <BookingComments v-if="!bookingModal.creating"/>
            </div>
        </div>
        <template #footer>
            <BookingModalActions />
        </template>
    </Modal>
</template>

<style lang="less" scoped>
h2 {
    padding-bottom: var(--gap-xtiny);
}

.info {
    font-size: smaller;
    font-weight: 500;
    color: var(--color-text2);
}

.group {
    display: flex;
    flex-direction: column;
}

.content {
    display: flex;
    gap: var(--gap-medium);
    flex-direction: column;
    width: 540px;
}

@media (max-width: 800px) {
    .content {
        width: 100%;
    }
}
</style>
<script setup>
import Modal from './Modal.vue'
import { useBookingSearchStore } from '../stores/bookingSearch';
import { onActivated, onMounted } from 'vue';
import { useConfirmModalStore } from '../stores/confirmModal';
import BookingTable from './BookingTable.vue';

const bookingSearch = useBookingSearchStore()
const bookingModal = useConfirmModalStore()

</script>

<template>
    <div>
        <Modal :modal-active="bookingSearch.active" @close="bookingSearch.reset()" @clicked="bookingModal.open">
            <div class="search-wrapper">
                <div class="field">
                    <input v-model="bookingSearch.query" v-focus id="search-input" type="text" placeholder="Search bookings from all properties">
                </div>
                <BookingTable :list="bookingSearch.results" :search="true"/>
                <div v-if="bookingSearch.loading" class="loading-container">
                    <div class="loader"></div>
                </div>
                <h4 v-if="!bookingSearch.loading && bookingSearch.query && !bookingSearch.results.length">No results</h4>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped>
.modal-container {
    align-items: flex-start;
    z-index: 4;
}
.search-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--gap-medium);
}

.field {
    width: 300px;
    margin: 0;
    padding: 0;
}

@media (max-width: 800px) {
    .field {
        width: 260px;
    }
}
</style>
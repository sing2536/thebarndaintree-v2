<script setup>
import BookingTableFilter from '../components/BookingTableFilter.vue';
import { useBookingModalStore } from '../stores/bookingModal';
import { usePropertiesStore } from '../stores/properties';
import BookingHelp from './BookingHelp.vue';

const bookingModal = useBookingModalStore()
const properties = usePropertiesStore()
</script>


<template>
    <div v-show="properties.list.length" class="actions">
        <BookingHelp />
        <BookingTableFilter />
        <button class="raised primary no-margin" @click="bookingModal.create()">Create Booking</button>
    </div>
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-small);
  width: 100%;
  margin-bottom: var(--gap-small);
  margin-top: var(--gap-large);
  align-items: flex-end;
}

button {
  height: 42px;
}

@media (max-width: 800px) {
    .actions {
      // justify-content: center; 
    }
}
</style>
<script setup>
import { useBookingModalStore } from '../stores/bookingModal';
import status from '../mixins/statusCategories'
import source from '..//mixins/sourceCategories'
import ferry from '../mixins/ferryCategories'

const { data, creating } = useBookingModalStore()

function checkOutClick(e) {
    if (e.target.value) return 
    e.target.value = document.querySelector('#checkInInput').value
}
</script>

<template>
        <div class="container">
            <div class="stack">
                <div class="field">
                    <label>Status</label>
                    <select v-model="data.status">
                        <option disabled value="">Select an option</option>
                        <option v-for="item in status.list" :value="item.id">{{item.label}}</option>
                    </select>
                </div>
                <div class="field"><label>Name</label><input v-model="data.name" type="text"></div>
            </div>
            <div class="stack">
                <div class="field"><label>Check In</label><input id="checkInInput" v-model="data.checkIn" type="date"></div>
                <div class="field"><label>Check Out</label><input v-model="data.checkOut" @click="checkOutClick" type="date"></div>
                <div class="field"><label>Quote</label><input v-model="data.quote" type="number" placeholder="0.00"></div>
            </div>
            <div class="stack">
                <div class="field"><label>Adults</label><input v-model="data.adults" type="number" placeholder="0"></div>
                <div class="field"><label>Children</label><input v-model="data.children" type="number" placeholder="0"></div>
                <div class="field">
                    <label>Source</label>
                    <select v-model="data.source">
                        <option disabled value="">Select an option</option>
                        <option v-for="item in source.list" :value="item.id">{{item.label}}</option>
                    </select>
                </div>
            </div>
            <div class="stack">
                <!-- <div class="field">
                    <label>Ferry</label>
                    <select v-model="data.ferry">
                        <option disabled value="">Select an option</option>
                        <option v-for="item in ferry.list" :value="item.id">{{item.label}}</option>
                    </select>
                </div> -->
                <div class="field"><label>Phone</label><input v-model="data.phone" type="text"></div>
                <div class="field"><label>Email</label><input v-model="data.email" type="text"></div>
            </div>
            <div v-if="creating" class="field">
                <label>Comment</label>
                <textarea v-model="data.comment" rows="3"></textarea>
            </div>
        </div>
</template>

<style lang="less" scoped>
.stack {
    display: flex;
    flex: 1;
    gap: var(--gap-small);
}
@media (max-width: 800px) {
    .stack {
        flex-direction: column;
        gap: unset;
    }
}
</style>
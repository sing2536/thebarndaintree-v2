<script setup>
import moment from 'moment';
import { Icon } from '@iconify/vue';
import { useBookingModalStore } from '../stores/bookingModal';
import BookingPaymentsForm from './BookingPaymentsForm.vue';

const bookingModal = useBookingModalStore()
const data = bookingModal.data.receipts
const bookingId = bookingModal.data.id

function download(fileName) {
    window.open(`api/receipts?id=${fileName}`, '_blank')
}

function view(fileName) {
    window.open(`api/receipts/view?id=${fileName}`, '_blank')
}
</script>

<template>
    <div>
        <h4>Payments & Receipts</h4>
        <BookingPaymentsForm />
        <div v-if="!data.length" class="empty-wrapper">No payments yet</div>
        <div v-else="data.length" class="container">
            <table>
                <tr>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Receipt</th>
                </tr>
                <tr v-for="item in data" :key="item.id">
                    <td>${{item.amountReceived}}</td>
                    <td>{{moment(item.createdAt).format('DD/MM/YYYY h:mm a')}}</td>
                    <td>
                        <a v-tooltip="'Download'">
                            <Icon @click="download(item.id)" class="action-buttons" icon="material-symbols:cloud-download-rounded" />
                        </a>
                        <a v-tooltip="'View'">
                            <Icon @click="view(item.id)" class="action-buttons" icon="ic:round-remove-red-eye" />
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style lang="less" scoped>
.empty-wrapper {
    font-size: smaller;
    font-weight: 500;
    color: var(--color-text2);
}
.container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--gap-small);
}
table {
    border-collapse: collapse;
}
th {
    color: var(--color-text2);
}
td, th {
    font-size: smaller;
    text-align: left;
    border-bottom: 1px solid var(--color-shade);
    padding: var(--gap-xtiny);
}
tr {
    &:hover {
        background: var(--color-shade);
    }
}
.action-buttons {
    font-size: medium;
    margin-right: var(--gap-small);
    vertical-align: sub;

    &:hover {
        cursor: pointer;
        color: var(--color-primary)
    }
}
</style>
<script setup>
import moment from 'moment'
import statuses from '../mixins/statusCategories'
import sources from '../mixins/sourceCategories'
import ferry from '../mixins/ferryCategories'
import { useBookingModalStore } from '../stores/bookingModal';

defineProps(['list', 'search'])
const bookingModal = useBookingModalStore()

function formatDates(date) {
    return moment(date).format('DD/MM/YY')
}
</script>

<template>
    <tr v-if="list.length" v-for="item in list" :key="list.index" @click="search ? bookingModal.openSync(item):bookingModal.open(item)">
        <td><div :class="['label', statuses.getTableClass(item.status)]">{{statuses.getLabel(item.status)}}</div></td>
        <td>{{item.name}}</td>
        <td>{{formatDates(item.checkIn)}}</td>
        <td>{{formatDates(item.checkOut)}}</td>
        <td class="mobile">{{item.adults}}</td>
        <td class="mobile">{{item.children}}</td>
        <td class="tablet">{{sources.getLabel(item.source)}}</td>
        <td class="mobile">${{item.quote}}</td>
        <td class="tablet">${{(item.quote - item.receipts.reduce((a, b) => a + parseFloat(b.amountReceived), 0)).toFixed(2)}}</td>
        <!-- <td class="mobile"><div :class="['label', ferry.getTableClass(item.ferry)]">{{ferry.getLabel(item.ferry)}}</div></td> -->
        <td class="wrap-text fill-width mobile">{{item.comments.length ? item.comments[0].message : ''}}</td>
    </tr>
</template>

<style lang="less" scoped>
@import '../assets/css/table.less';
</style>
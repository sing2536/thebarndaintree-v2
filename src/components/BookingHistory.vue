<script setup>
import { reactive, ref } from 'vue';
import moment from 'moment'
import { useBookingModalStore } from '../stores/bookingModal';
import statuses from '../mixins/statusCategories'
import sources from '../mixins/sourceCategories'
import ferry from '../mixins/ferryCategories'

const bookingModal = useBookingModalStore()
const show = ref(false)
const loading = ref(false)
var list = reactive([])

async function view() {
    if (show.value) return show.value = false, list.length = 0
    loading.value = true
    const req = await fetch('api/bookings/history/'+bookingModal.data.id)
    list.push(...await req.json())
    loading.value = false
    show.value = true
}

function formatDates(date) {
    return moment(date).format('DD/MM/YY')
}
</script>

<template>
    <template v-if="!bookingModal.creating">
        <a href="#" @click.prevent="view()">{{show ? 'Hide':'View'}} historical changes</a>
        <div v-if="loading" class="loader small">Loading...</div>
        <table v-if="show">
            <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Quote</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Source</th>
                <th>Ferry</th>
                <th>Phone</th>
                <th>Email</th>
            </tr>
            <tr v-for="item in list">
                <td>{{statuses.getLabel(item.status)}}</td>
                <td>{{item.name}}</td>
                <td>{{formatDates(item.checkIn)}}</td>
                <td>{{formatDates(item.checkOut)}}</td>
                <td>{{item.quote}}</td>
                <td>{{item.adults}}</td>
                <td>{{item.children}}</td>
                <td>{{sources.getLabel(item.source)}}</td>
                <td>{{ferry.getLabel(item.ferry)}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.email}}</td>
            </tr>
        </table>
        <div v-if="show && !list.length" class="empty">No history yet</div>
    </template>
</template>

<style lang="less" scoped>
a {
    align-self: flex-end;
    font-size: smaller;
}
.loader {
    font-size: smaller;
    color: var(--color-text2);
    text-align: center;
}
.empty {
    font-size: smaller;
    font-weight: 500;
    color: var(--color-text2);
    text-align: center;
    padding-top: var(--gap-tiny);
}
table {
    border-collapse: collapse;
}
th {
    color: var(--color-text2);
}
td, th {
    font-size: x-small;
    text-align: left;
    border-bottom: 1px solid var(--color-shade);
    padding: var(--gap-xtiny);
}
td{
    word-break: break-all;
}
tr {
    &:hover {
        background: var(--color-shade);
    }
}
</style>
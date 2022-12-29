<script setup>
import { onMounted } from 'vue';
import BookingCalendar from '../components/BookingCalendar.vue';
import BookingTable from '../components/BookingTable.vue';
import PropertySelect from '../components/PropertySelect.vue';
import SubscriptionMessage from '../components/SubscriptionMessage.vue';
import { usePropertiesStore } from '../stores/properties';
import { useTableStore } from '../stores/table';
import { useUserStore } from '../stores/user';
import { useTableFilter } from '../stores/tableFilter';
import BookingTableActions from '../components/BookingTableActions.vue';

const table = useTableStore()
const properties = usePropertiesStore()
const user = useUserStore()
const tableFilter = useTableFilter()

onMounted(async ()=>{
  user.getData()
  await properties.getProperties()
  if (!properties.list.length) return //for new users with no properties
  await tableFilter.getData()
})
</script>

<template>
  <div>
    <SubscriptionMessage />
    <PropertySelect />
    <BookingCalendar />
    <BookingTableActions />
    <BookingTable v-show="properties.list.length" :list="table.list"/>
  </div>
</template>